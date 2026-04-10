import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HoleMap } from '@/components/HoleMap';
import { ScoreInput } from '@/components/ScoreInput';
import { YardageCard } from '@/components/YardageCard';
import { getCourseById, isPlayableCourse } from '@/services/course/catalog';
import type { Coordinate, Course } from '@/services/course/types';
import { calculateHoleYardages } from '@/services/gps/calculate-yardages';
import { getCurrentCoordinate, watchForegroundCoordinate } from '@/services/gps/location';
import { sampleUserLocation } from '@/services/gps/mock-location';
import { activeRound } from '@/services/roundEngine/mock-rounds';

type GpsState = 'loading' | 'live' | 'demo' | 'unavailable';

export default function HomeScreen() {
  const [course, setCourse] = useState<Course | null>(null);
  const [courseError, setCourseError] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinate>(sampleUserLocation);
  const [gpsState, setGpsState] = useState<GpsState>('loading');
  const [gpsMessage, setGpsMessage] = useState('Checking location permissions...');
  const [strokes, setStrokes] = useState(4);
  const [putts, setPutts] = useState(2);
  const [penalties, setPenalties] = useState(0);
  const [fairwayHit, setFairwayHit] = useState(false);
  const [gir, setGir] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadCourse() {
      const nextCourse = await getCourseById(activeRound.courseId);

      if (!active) {
        return;
      }

      if (!nextCourse || !isPlayableCourse(nextCourse)) {
        setCourseError('This course is missing playable GPS target data.');
        return;
      }

      setCourse(nextCourse);
    }

    void loadCourse();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    let subscription: { remove: () => void } | null = null;

    async function connectLocation() {
      const currentLocation = await getCurrentCoordinate();

      if (!active) {
        return;
      }

      if (currentLocation) {
        setLocation(currentLocation);
        setGpsState('live');
        setGpsMessage('Live yardages updating from your device location.');

        subscription = await watchForegroundCoordinate((nextCoordinate) => {
          setLocation(nextCoordinate);
          setGpsState('live');
          setGpsMessage('Live yardages updating from your device location.');
        });

        return;
      }

      setGpsState('demo');
      setGpsMessage('Location permission not granted. Showing demo yardages from seeded coordinates.');
    }

    void connectLocation();

    return () => {
      active = false;
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (!course) {
      return;
    }

    const currentHole = course.holes[activeRound.currentHole - 1];
    const savedHole = activeRound.holeScores[currentHole.number - 1];

    setStrokes(savedHole.strokes ?? currentHole.par);
    setPutts(savedHole.putts ?? 2);
    setPenalties(savedHole.penalties);
    setFairwayHit(savedHole.fairwayHit ?? false);
    setGir(savedHole.gir ?? false);
  }, [course]);

  if (courseError) {
    return (
      <View style={styles.errorState}>
        <Text style={styles.errorTitle}>Course Unavailable</Text>
        <Text style={styles.errorCopy}>{courseError}</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.errorState}>
        <Text style={styles.errorTitle}>Loading Round</Text>
        <Text style={styles.errorCopy}>Preparing course data and active hole context.</Text>
      </View>
    );
  }

  const currentHole = course.holes[activeRound.currentHole - 1];
  const yardages = calculateHoleYardages(location, currentHole.targets, 'yards');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Active Round</Text>
        <Text style={styles.title}>{course.name}</Text>
        <Text style={styles.subtitle}>
          Hole {currentHole.number} | Par {currentHole.par} | {currentHole.distance} yds
        </Text>
      </View>

      <View style={[styles.statusCard, gpsState === 'live' ? styles.statusCardLive : styles.statusCardDemo]}>
        <Text style={styles.statusTitle}>
          {gpsState === 'live' ? 'Live GPS' : gpsState === 'loading' ? 'Starting GPS' : 'Demo GPS'}
        </Text>
        <Text style={styles.statusCopy}>{gpsMessage}</Text>
      </View>

      <YardageCard front={yardages.front} center={yardages.center} back={yardages.back} />

      <HoleMap
        holeNumber={currentHole.number}
        par={currentHole.par}
        teeDistance={currentHole.distance}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hole Scoring</Text>
        <View style={styles.scoreGrid}>
          <ScoreInput label="Strokes" value={strokes} onChange={setStrokes} min={1} max={15} />
          <ScoreInput label="Putts" value={putts} onChange={setPutts} min={0} max={8} />
          <ScoreInput
            label="Penalties"
            value={penalties}
            onChange={setPenalties}
            min={0}
            max={6}
          />
        </View>

        <View style={styles.toggleRow}>
          <Pressable
            style={[styles.toggleChip, fairwayHit && styles.toggleChipActive]}
            onPress={() => setFairwayHit((value) => !value)}>
            <Text style={[styles.toggleLabel, fairwayHit && styles.toggleLabelActive]}>
              Fairway Hit
            </Text>
          </Pressable>

          <Pressable
            style={[styles.toggleChip, gir && styles.toggleChipActive]}
            onPress={() => setGir((value) => !value)}>
            <Text style={[styles.toggleLabel, gir && styles.toggleLabelActive]}>GIR</Text>
          </Pressable>
        </View>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonLabel}>Save Hole and Advance</Text>
        </Pressable>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>Sprint 1 Direction</Text>
        <Text style={styles.footerCopy}>
          The Play screen now loads course data through a catalog service and prefers live GPS
          updates. The next step is replacing seeded course content with Supabase-backed course
          records and persisted round state.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 18
  },
  heroCard: {
    backgroundColor: '#102017',
    borderRadius: 24,
    padding: 20,
    gap: 6
  },
  eyebrow: {
    color: '#c7d5bf',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  title: {
    color: '#fff8ec',
    fontSize: 28,
    fontWeight: '800'
  },
  subtitle: {
    color: '#d9e4d7',
    fontSize: 15
  },
  statusCard: {
    borderRadius: 20,
    padding: 16,
    gap: 6
  },
  statusCardLive: {
    backgroundColor: '#ddf1df'
  },
  statusCardDemo: {
    backgroundColor: '#f3e4c8'
  },
  statusTitle: {
    color: '#18231d',
    fontSize: 16,
    fontWeight: '800'
  },
  statusCopy: {
    color: '#344138',
    lineHeight: 20
  },
  section: {
    backgroundColor: '#fff9ef',
    borderRadius: 24,
    padding: 18,
    gap: 16
  },
  sectionTitle: {
    color: '#1a281f',
    fontSize: 20,
    fontWeight: '700'
  },
  scoreGrid: {
    gap: 12
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12
  },
  toggleChip: {
    backgroundColor: '#efe5d2',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  toggleChipActive: {
    backgroundColor: '#1e5a36'
  },
  toggleLabel: {
    color: '#233028',
    fontWeight: '700'
  },
  toggleLabelActive: {
    color: '#fff8ec'
  },
  primaryButton: {
    backgroundColor: '#d6a646',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center'
  },
  primaryButtonLabel: {
    color: '#1c170d',
    fontSize: 16,
    fontWeight: '800'
  },
  footerCard: {
    backgroundColor: '#e7dcc8',
    borderRadius: 20,
    padding: 18,
    gap: 8
  },
  footerTitle: {
    color: '#18231d',
    fontSize: 18,
    fontWeight: '700'
  },
  footerCopy: {
    color: '#344138',
    lineHeight: 20
  },
  errorState: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#f4ecdf'
  },
  errorTitle: {
    color: '#18231d',
    fontSize: 24,
    fontWeight: '800'
  },
  errorCopy: {
    color: '#455247',
    textAlign: 'center',
    lineHeight: 22
  }
});
