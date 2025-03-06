import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Ambulance, Hospital, TriangleAlert as AlertTriangle, MapPin, Clock, Navigation as NavigationIcon } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import AnimatedPressable from '../../components/AnimatedPressable';
import FadeIn from '../../components/FadeIn';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';

const emergencyLocations = [
  {
    id: 1,
    name: 'AIIMS Bhubaneswar',
    type: 'Hospital',
    contact: '0674-247-6789'
  },
  {
    id: 2,
    name: 'Capital Hospital',
    type: 'Hospital',
    contact: '0674-239-1983'
  },
  {
    id: 3,
    name: 'Fire Station Bhubaneswar',
    type: 'Emergency',
    contact: '101'
  },
  {
    id: 4,
    name: 'Police Control Room',
    type: 'Emergency',
    contact: '100'
  }
];

const nearbyHospitals = [
  {
    id: 1,
    name: 'AIIMS Bhubaneswar',
    distance: '2.5 km',
    time: '8 mins',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=300',
    location: 'AIIMS Bhubaneswar, Sijua, Patrapada, Bhubaneswar, Odisha'
  },
  {
    id: 2,
    name: 'Capital Hospital',
    distance: '3.8 km',
    time: '12 mins',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=300',
    location: 'Capital Hospital, Unit 6, Bhubaneswar, Odisha'
  }
];

export default function Home() {
  const router = useRouter();
  const { colors } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openMapsWithDirections = (location: string) => {
    const destination = encodeURIComponent(location);
    const url = Platform.select({
      ios: `maps://app?daddr=${destination}`,
      android: `google.navigation:q=${destination}`,
      web: `https://www.google.com/maps/dir/?api=1&destination=${destination}`
    });
    
    Linking.canOpenURL(url!)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url!);
        } else {
          // Fallback for all platforms
          const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
          return Linking.openURL(webUrl);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContent: {
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 10,
    },
    emergencyButton: {
      padding: 20,
    },
    sosButton: {
      overflow: 'hidden',
      borderRadius: 12,
    },
    sosGradient: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sosText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10,
      justifyContent: 'space-between',
    },
    serviceCard: {
      backgroundColor: colors.surface,
      width: '48%',
      borderRadius: 12,
      marginBottom: 15,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    serviceGradient: {
      padding: 20,
      alignItems: 'center',
    },
    serviceTitle: {
      marginTop: 10,
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    seeAllText: {
      fontSize: 14,
      color: colors.primary,
    },
    nearbyHospitalsContainer: {
      paddingHorizontal: 10,
    },
    hospitalCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
      marginHorizontal: 10,
      width: 250,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    hospitalImage: {
      width: '100%',
      height: 120,
    },
    hospitalInfo: {
      padding: 15,
    },
    hospitalName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    infoText: {
      marginLeft: 8,
      color: colors.subtext,
      fontSize: 14,
    },
    emergencyServicesSection: {
      padding: 20,
    },
    emergencyCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginBottom: 10,
      flexDirection: 'row',
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    serviceIndicator: {
      width: 6,
    },
    emergencyInfo: {
      padding: 15,
      flex: 1,
    },
    emergencyName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    emergencyType: {
      fontSize: 14,
      color: colors.subtext,
      marginTop: 2,
    },
    emergencyContact: {
      fontSize: 14,
      color: colors.primary,
      marginTop: 4,
      fontWeight: '500',
    },
    infoSection: {
      padding: 20,
    },
    infoTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    infoGradient: {
      padding: 15,
    },
    infoText: {
      fontSize: 16,
      color: colors.subtext,
      lineHeight: 24,
    },
    viewDetailsButton: {
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10
    },
    viewDetailsText: {
      color: '#fff',
      fontWeight: '600'
    },
    directionsButton: {
      backgroundColor: colors.secondary,
      padding: 8,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    directionsText: {
      color: '#fff',
      fontWeight: '600',
      marginLeft: 5
    }
  });

  return (
    <View style={styles.container}>
      <Header 
        title="PRANA" 
        subtitle="Your Emergency Response Partner" 
        onMenuPress={() => setIsSidebarOpen(true)} 
      />
      
      <ScrollView>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=400' }}
            style={styles.headerImage}
          />
        </View>

        <Animated.View
          entering={SlideInRight.springify().delay(200)}
          style={styles.emergencyButton}>
          <AnimatedPressable
            style={styles.sosButton}
            onPress={() => router.push('/emergency')}>
            <LinearGradient
              colors={colors.gradients.error}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sosGradient}>
              <AlertTriangle size={32} color="#fff" />
              <Text style={styles.sosText}>SOS Emergency</Text>
            </LinearGradient>
          </AnimatedPressable>
        </Animated.View>

        <View style={styles.servicesGrid}>
          <AnimatedPressable
            style={styles.serviceCard}
            onPress={() => router.push('/emergency')}>
            <LinearGradient
              colors={colors.gradients.surface}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceGradient}>
              <Phone size={32} color={colors.primary} />
              <Text style={styles.serviceTitle}>Emergency Call</Text>
            </LinearGradient>
          </AnimatedPressable>

          <AnimatedPressable
            style={styles.serviceCard}
            onPress={() => router.push('/emergency?type=ambulance')}>
            <LinearGradient
              colors={colors.gradients.surface}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceGradient}>
              <Ambulance size={32} color={colors.primary} />
              <Text style={styles.serviceTitle}>Request Ambulance</Text>
            </LinearGradient>
          </AnimatedPressable>

          <AnimatedPressable
            style={styles.serviceCard}
            onPress={() => router.push('/hospitals')}>
            <LinearGradient
              colors={colors.gradients.surface}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.serviceGradient}>
              <Hospital size={32} color={colors.primary} />
              <Text style={styles.serviceTitle}>Find Hospital</Text>
            </LinearGradient>
          </AnimatedPressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
          <TouchableOpacity onPress={() => router.push('/hospitals')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.nearbyHospitalsContainer}>
          {nearbyHospitals.map((hospital, index) => (
            <FadeIn key={hospital.id} delay={index * 100}>
              <View style={styles.hospitalCard}>
                <Image source={{ uri: hospital.image }} style={styles.hospitalImage} />
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  
                  <View style={styles.infoRow}>
                    <MapPin size={16} color={colors.primary} />
                    <Text style={styles.infoText}>{hospital.distance}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Clock size={16} color={colors.primary} />
                    <Text style={styles.infoText}>{hospital.time}</Text>
                  </View>

                  <AnimatedPressable 
                    style={styles.viewDetailsButton}
                    onPress={() => router.push(`/hospitals/${hospital.id}`)}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </AnimatedPressable>
                  
                  <AnimatedPressable 
                    style={styles.directionsButton}
                    onPress={() => openMapsWithDirections(hospital.location)}>
                    <NavigationIcon size={14} color="#fff" />
                    <Text style={styles.directionsText}>Directions</Text>
                  </AnimatedPressable>
                </View>
              </View>
            </FadeIn>
          ))}
        </ScrollView>

        <View style={styles.emergencyServicesSection}>
          <Text style={styles.sectionTitle}>Emergency Services in Odisha</Text>
          {emergencyLocations.map((location) => (
            <AnimatedPressable key={location.id} style={styles.emergencyCard}>
              <View
                style={[
                  styles.serviceIndicator,
                  {
                    backgroundColor:
                      location.type === 'Hospital' ? colors.primary : colors.error,
                  },
                ]}
              />
              <View style={styles.emergencyInfo}>
                <Text style={styles.emergencyName}>{location.name}</Text>
                <Text style={styles.emergencyType}>{location.type}</Text>
                <Text style={styles.emergencyContact}>{location.contact}</Text>
              </View>
            </AnimatedPressable>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Emergency Tips</Text>
          <View style={styles.infoCard}>
            <LinearGradient
              colors={colors.gradients.surface}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.infoGradient}>
              <Text style={styles.infoText}>
                • Stay calm and assess the situation{'\n'}
                • Call emergency services immediately{'\n'}
                • Follow dispatcher instructions{'\n'}
                • Keep emergency contacts handy
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </View>
  );
}