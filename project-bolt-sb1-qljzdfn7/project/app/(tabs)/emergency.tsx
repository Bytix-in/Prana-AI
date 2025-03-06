import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Phone, Ambulance, TriangleAlert as AlertTriangle, MapPin, Clock, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import AnimatedPressable from '../../components/AnimatedPressable';
import FadeIn from '../../components/FadeIn';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { LinearGradient } from 'expo-linear-gradient';

export default function Emergency() {
  const router = useRouter();
  const { colors } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('emergency');

  const emergencyServices = [
    {
      title: 'Emergency Call',
      icon: Phone,
      action: () => console.log('Emergency call'),
      color: colors.error
    },
    {
      title: 'Request Ambulance',
      icon: Ambulance,
      action: () => console.log('Request ambulance'),
      color: '#FF9500'
    }
  ];

  const emergencyContacts = [
    {
      id: 1,
      name: 'John Doe',
      relation: 'Father',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      name: 'Jane Smith',
      relation: 'Mother',
      phone: '+91 98765 43211'
    },
    {
      id: 3,
      name: 'Dr. Patel',
      relation: 'Family Doctor',
      phone: '+91 98765 43212'
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    tabsContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 15,
      alignItems: 'center',
    },
    activeTab: {
      borderBottomWidth: 3,
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.subtext,
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    sosButton: {
      backgroundColor: colors.error,
      margin: 20,
      padding: 20,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sosGradient: {
      padding: 20,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    sosText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    servicesContainer: {
      padding: 20,
    },
    serviceCard: {
      backgroundColor: colors.surface,
      padding: 20,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    serviceTitle: {
      fontSize: 18,
      color: colors.text,
      marginLeft: 15,
    },
    contactsContainer: {
      padding: 20,
    },
    contactCard: {
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    contactHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    contactInfo: {
      marginLeft: 15,
      flex: 1,
    },
    contactName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    contactRelation: {
      fontSize: 14,
      color: colors.subtext,
    },
    contactPhone: {
      fontSize: 16,
      color: colors.primary,
      marginTop: 5,
    },
    callButton: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    callButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
    addContactButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      borderStyle: 'dashed',
    },
    addContactText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Emergency" 
        subtitle="Get immediate help" 
        onMenuPress={() => setIsSidebarOpen(true)} 
      />
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'emergency' && styles.activeTab]}
          onPress={() => setActiveTab('emergency')}>
          <Text style={[styles.tabText, activeTab === 'emergency' && styles.activeTabText]}>
            Emergency
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
          onPress={() => setActiveTab('contacts')}>
          <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>
            Emergency Contacts
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {activeTab === 'emergency' ? (
          <>
            <Animated.View
              entering={SlideInRight.springify().delay(200)}>
              <AnimatedPressable
                onPress={() => console.log('SOS pressed')}>
                <LinearGradient
                  colors={colors.gradients.error}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.sosGradient}>
                  <AlertTriangle size={32} color="#fff" />
                  <Text style={styles.sosText}>SOS EMERGENCY</Text>
                </LinearGradient>
              </AnimatedPressable>
            </Animated.View>

            <View style={styles.servicesContainer}>
              {emergencyServices.map((service, index) => (
                <FadeIn key={index} delay={index * 200 + 400}>
                  <AnimatedPressable
                    style={styles.serviceCard}
                    onPress={service.action}>
                    <service.icon size={32} color={service.color} />
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                  </AnimatedPressable>
                </FadeIn>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.contactsContainer}>
            {emergencyContacts.map((contact, index) => (
              <FadeIn key={contact.id} delay={index * 100}>
                <View style={styles.contactCard}>
                  <View style={styles.contactHeader}>
                    <User size={32} color={colors.primary} />
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{contact.name}</Text>
                      <Text style={styles.contactRelation}>{contact.relation}</Text>
                    </View>
                    <TouchableOpacity style={styles.callButton}>
                      <Text style={styles.callButtonText}>Call</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
              </FadeIn>
            ))}
            
            <AnimatedPressable style={styles.addContactButton}>
              <Text style={styles.addContactText}>Add Emergency Contact</Text>
            </AnimatedPressable>
          </View>
        )}
      </ScrollView>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </View>
  );
}