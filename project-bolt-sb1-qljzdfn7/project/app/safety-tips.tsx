import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { TriangleAlert as AlertTriangle, Heart, Flame, Droplets, Wind } from 'lucide-react-native';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FadeIn from '../components/FadeIn';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

const safetyTips = [
  {
    id: 1,
    title: 'Medical Emergency',
    icon: Heart,
    color: '#FF3B30',
    tips: [
      'Check for breathing and pulse',
      'Call emergency services immediately',
      'If trained, perform CPR if necessary',
      'Keep the person warm and comfortable',
      'Monitor vital signs until help arrives'
    ],
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=300'
  },
  {
    id: 2,
    title: 'Fire Emergency',
    icon: Flame,
    color: '#FF9500',
    tips: [
      'Evacuate immediately, don\'t collect belongings',
      'Stay low to avoid smoke inhalation',
      'Feel doors before opening - if hot, find another exit',
      'Use stairs, never elevators',
      'Call fire services once safely outside'
    ],
    image: 'https://images.unsplash.com/photo-1486551937199-baf066858de7?auto=format&fit=crop&w=300'
  },
  {
    id: 3,
    title: 'Flood Safety',
    icon: Droplets,
    color: '#007AFF',
    tips: [
      'Move to higher ground immediately',
      'Avoid walking or driving through flood waters',
      'Stay away from power lines and electrical wires',
      'Be prepared to evacuate',
      'Listen to emergency broadcasts'
    ],
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=300'
  },
  {
    id: 4,
    title: 'Cyclone Preparedness',
    icon: Wind,
    color: '#5856D6',
    tips: [
      'Secure loose items outside your home',
      'Stay indoors during the cyclone',
      'Keep emergency supplies ready',
      'Charge phones and keep emergency contacts handy',
      'Follow evacuation orders if issued'
    ],
    image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=300'
  }
];

export default function SafetyTips() {
  const { colors } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    banner: {
      overflow: 'hidden',
      borderRadius: 12,
      margin: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    bannerGradient: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bannerIcon: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    bannerContent: {
      flex: 1,
    },
    bannerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5,
    },
    bannerText: {
      fontSize: 14,
      color: '#fff',
      opacity: 0.9,
    },
    tipCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      margin: 15,
      marginBottom: 10,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    tipHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    tipIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    tipTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
    },
    tipContent: {
      padding: 15,
      paddingTop: 0,
    },
    tipImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 15,
    },
    tipList: {
      marginBottom: 10,
    },
    tipItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    tipBullet: {
      fontSize: 16,
      color: colors.primary,
      marginRight: 10,
      lineHeight: 24,
    },
    tipText: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
      lineHeight: 24,
    },
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Safety Tips" 
        subtitle="Be prepared for emergencies" 
        onMenuPress={() => setIsSidebarOpen(true)} 
      />
      
      <ScrollView>
        <Animated.View 
          entering={FadeInDown.delay(200)}
          style={styles.banner}>
          <LinearGradient
            colors={colors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bannerGradient}>
            <View style={styles.bannerIcon}>
              <AlertTriangle size={24} color="#fff" />
            </View>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Be Prepared</Text>
              <Text style={styles.bannerText}>
                Knowledge and preparation are key to handling emergencies effectively.
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {safetyTips.map((tip, index) => (
          <FadeIn key={tip.id} delay={index * 100 + 300}>
            <View style={styles.tipCard}>
              <TouchableOpacity 
                style={styles.tipHeader} 
                onPress={() => toggleExpand(tip.id)}>
                <View style={[styles.tipIconContainer, { backgroundColor: tip.color + '20' }]}>
                  <tip.icon size={24} color={tip.color} />
                </View>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={{ color: colors.primary, fontSize: 16 }}>
                  {expandedTip === tip.id ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
              
              {expandedTip === tip.id && (
                <View style={styles.tipContent}>
                  <Image source={{ uri: tip.image }} style={styles.tipImage} />
                  <View style={styles.tipList}>
                    {tip.tips.map((tipText, tipIndex) => (
                      <View key={tipIndex} style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>{tipText}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </FadeIn>
        ))}
      </ScrollView>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </View>
  );
}