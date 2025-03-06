import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Bell, Globe, CircleHelp as HelpCircle, Shield, Languages, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AnimatedPressable from '../../components/AnimatedPressable';
import FadeIn from '../../components/FadeIn';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings() {
  const { theme, toggleTheme, colors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLanguagePress = () => {
    Alert.alert('Language', 'Choose your preferred language', [
      { text: 'English', onPress: () => console.log('English selected') },
      { text: 'Hindi', onPress: () => console.log('Hindi selected') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleFAQPress = () => {
    Alert.alert(
      'Frequently Asked Questions',
      '1. How to use emergency services?\n2. How to add emergency contacts?\n3. How to update medical information?',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert(
      'Privacy Policy',
      'We take your privacy seriously. Your data is encrypted and securely stored.',
      [{ text: 'OK' }]
    );
  };

  const handleAboutPress = () => {
    Alert.alert(
      'About PRANA',
      'PRANA is an emergency response system designed to provide quick assistance during emergencies.',
      [{ text: 'OK' }]
    );
  };

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: Moon,
          title: 'Dark Mode',
          type: 'switch',
          value: theme === 'dark',
          onValueChange: toggleTheme
        },
        {
          icon: Bell,
          title: 'Notifications',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications
        },
        {
          icon: Languages,
          title: 'Language',
          type: 'link',
          value: 'English',
          onPress: handleLanguagePress
        }
      ]
    },
    {
      title: 'Location & Privacy',
      items: [
        {
          icon: Globe,
          title: 'Location Services',
          type: 'switch',
          value: locationServices,
          onValueChange: setLocationServices
        },
        {
          icon: Shield,
          title: 'Privacy Policy',
          type: 'link',
          onPress: handlePrivacyPress
        }
      ]
    },
    {
      title: 'Help & Support',
      items: [
        {
          icon: HelpCircle,
          title: 'FAQ',
          type: 'link',
          onPress: handleFAQPress
        },
        {
          icon: Globe,
          title: 'About PRANA',
          type: 'link',
          onPress: handleAboutPress
        }
      ]
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    section: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.subtext,
      marginBottom: 10,
      letterSpacing: 0.5,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingText: {
      marginLeft: 15,
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    settingValue: {
      fontSize: 16,
      color: colors.subtext,
      marginRight: 8,
    },
    chevron: {
      marginLeft: 8,
    },
    themePreview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 20,
    },
    themeCard: {
      width: '48%',
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    themeGradient: {
      padding: 15,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    themeTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5,
    },
    themeSubtitle: {
      fontSize: 14,
      color: '#fff',
      opacity: 0.8,
    },
    activeTheme: {
      borderWidth: 2,
      borderColor: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Settings" 
        onMenuPress={() => setIsSidebarOpen(true)} 
      />
      
      <ScrollView>
        <View style={styles.themePreview}>
          <TouchableOpacity 
            style={[
              styles.themeCard, 
              theme === 'light' && styles.activeTheme
            ]}
            onPress={() => theme === 'dark' && toggleTheme()}>
            <LinearGradient
              colors={['#4A3AFF', '#8C7CFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.themeGradient}>
              <Text style={styles.themeTitle}>Light Mode</Text>
              <Text style={styles.themeSubtitle}>Bright & Clear</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.themeCard, 
              theme === 'dark' && styles.activeTheme
            ]}
            onPress={() => theme === 'light' && toggleTheme()}>
            <LinearGradient
              colors={['#6C63FF', '#A594FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.themeGradient}>
              <Text style={styles.themeTitle}>Dark Mode</Text>
              <Text style={styles.themeSubtitle}>Easy on Eyes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <FadeIn
            key={sectionIndex}
            delay={sectionIndex * 100}
            style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item, itemIndex) => (
              <AnimatedPressable
                key={itemIndex}
                style={styles.settingItem}
                onPress={item.type === 'link' ? item.onPress : undefined}
              >
                <View style={styles.settingLeft}>
                  <item.icon size={24} color={colors.primary} />
                  <Text style={styles.settingText}>{item.title}</Text>
                </View>
                
                {item.type === 'switch' ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={item.value ? colors.accent : '#f4f3f4'}
                  />
                ) : (
                  <>
                    {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                    <ChevronRight size={20} color={colors.subtext} style={styles.chevron} />
                  </>
                )}
              </AnimatedPressable>
            ))}
          </FadeIn>
        ))}
      </ScrollView>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </View>
  );
}