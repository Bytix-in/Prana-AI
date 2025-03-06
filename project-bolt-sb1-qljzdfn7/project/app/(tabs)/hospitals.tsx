import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Linking, Platform } from 'react-native';
import { MapPin, Phone, Clock, Navigation as NavigationIcon, Search } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import AnimatedPressable from '../../components/AnimatedPressable';
import FadeIn from '../../components/FadeIn';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Animated, { FadeInDown } from 'react-native-reanimated';

const bbsrHospitals = [
  {
    id: 1,
    name: 'AIIMS Bhubaneswar',
    distance: '2.5 km',
    phone: '0674-247-6789',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=300',
    location: 'AIIMS Bhubaneswar, Sijua, Patrapada, Bhubaneswar, Odisha'
  },
  {
    id: 2,
    name: 'Capital Hospital',
    distance: '3.8 km',
    phone: '0674-239-1983',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=300',
    location: 'Capital Hospital, Unit 6, Bhubaneswar, Odisha'
  },
  {
    id: 3,
    name: 'KIMS Hospital',
    distance: '5.2 km',
    phone: '0674-248-9999',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=300',
    location: 'KIMS Hospital, Patia, Bhubaneswar, Odisha'
  },
  {
    id: 4,
    name: 'Apollo Hospital',
    distance: '6.1 km',
    phone: '0674-661-0000',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=300',
    location: 'Apollo Hospital, Sainik School Road, Bhubaneswar, Odisha'
  },
  {
    id: 5,
    name: 'SUM Hospital',
    distance: '7.3 km',
    phone: '0674-238-6281',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300',
    location: 'SUM Hospital, Kalinga Nagar, Bhubaneswar, Odisha'
  },
  {
    id: 6,
    name: 'Kalinga Hospital',
    distance: '4.5 km',
    phone: '0674-239-0724',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300',
    location: 'Kalinga Hospital, Chandrasekharpur, Bhubaneswar, Odisha'
  },
  {
    id: 7,
    name: 'Hi-Tech Medical College & Hospital',
    distance: '8.2 km',
    phone: '0674-230-0003',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300',
    location: 'Hi-Tech Medical College & Hospital, Pandara, Bhubaneswar, Odisha'
  },
  {
    id: 8,
    name: 'Aditya Care Hospital',
    distance: '5.7 km',
    phone: '0674-239-1350',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300',
    location: 'Aditya Care Hospital, Chandrasekharpur, Bhubaneswar, Odisha'
  },
  {
    id: 9,
    name: 'Neelachal Hospital',
    distance: '6.8 km',
    phone: '0674-239-0044',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=300',
    location: 'Neelachal Hospital, Khandagiri, Bhubaneswar, Odisha'
  },
  {
    id: 10,
    name: 'SCB Medical College & Hospital',
    distance: '28.5 km',
    phone: '0671-241-4080',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1580281657702-257584239a55?auto=format&fit=crop&w=300',
    location: 'SCB Medical College & Hospital, Cuttack, Odisha'
  },
  {
    id: 11,
    name: 'Shanti Memorial Hospital',
    distance: '30.2 km',
    phone: '0671-236-7281',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300',
    location: 'Shanti Memorial Hospital, Cuttack, Odisha'
  },
  {
    id: 12,
    name: 'MKCG Medical College & Hospital',
    distance: '168 km',
    phone: '0680-229-2746',
    hours: '24/7 Emergency',
    image: 'https://images.unsplash.com/photo-1580281658223-9b94c8e9b9d6?auto=format&fit=crop&w=300',
    location: 'MKCG Medical College & Hospital, Berhampur, Odisha'
  }
];

export default function Hospitals() {
  const { colors } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = bbsrHospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    searchContainer: {
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      margin: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: colors.text,
    },
    hospitalCard: {
      backgroundColor: colors.surface,
      margin: 10,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    hospitalImage: {
      width: '100%',
      height: 150,
    },
    hospitalInfo: {
      padding: 15,
    },
    hospitalName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
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
    directionsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 8,
      marginTop: 10,
      justifyContent: 'center',
    },
    directionsText: {
      color: '#fff',
      marginLeft: 8,
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    emptyStateText: {
      fontSize: 16,
      color: colors.subtext,
      textAlign: 'center',
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Hospitals in Bhubaneswar" 
        subtitle="Find medical facilities near you" 
        onMenuPress={() => setIsSidebarOpen(true)} 
      />

      <Animated.View 
        entering={FadeInDown.delay(200)}
        style={styles.searchContainer}>
        <Search size={20} color={colors.subtext} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search hospitals..."
          placeholderTextColor={colors.subtext}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Animated.View>

      <ScrollView>
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital, index) => (
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
                    <Phone size={16} color={colors.primary} />
                    <Text style={styles.infoText}>{hospital.phone}</Text>
                  </View>
                  
                  <View style={styles.infoRow}>
                    <Clock size={16} color={colors.primary} />
                    <Text style={styles.infoText}>{hospital.hours}</Text>
                  </View>

                  <AnimatedPressable 
                    style={styles.directionsButton}
                    onPress={() => openMapsWithDirections(hospital.location)}>
                    <NavigationIcon size={16} color="#fff" />
                    <Text style={styles.directionsText}>Get Directions</Text>
                  </AnimatedPressable>
                </View>
              </View>
            </FadeIn>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No hospitals found matching "{searchQuery}".
              Try a different search term.
            </Text>
          </View>
        )}
      </ScrollView>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </View>
  );
}