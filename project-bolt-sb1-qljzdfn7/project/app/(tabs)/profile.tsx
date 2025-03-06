import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Heart, FileText, Settings, Edit, Shield, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import AnimatedPressable from '../../components/AnimatedPressable';
import FadeIn from '../../components/FadeIn';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Profile() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { colors } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      icon: User,
      title: 'Personal Information',
      onPress: () => console.log('Personal Info')
    },
    {
      icon: Phone,
      title: 'Emergency Contacts',
      onPress: () => console.log('Emergency Contacts')
    },
    {
      icon: Heart,
      title: 'Medical History',
      onPress: () => console.log('Medical History')
    },
    {
      icon: FileText,
      title: 'Documents',
      onPress: () => console.log('Documents')
    },
    {
      icon: Settings,
      title: 'Settings',
      onPress: () => router.push('/settings')
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    profileHeader: {
      overflow: 'hidden',
    },
    headerGradient: {
      padding: 20,
      alignItems: 'center',
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: 10,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#fff',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5,
    },
    email: {
      fontSize: 16,
      color: '#fff',
      opacity: 0.8,
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      margin: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      overflow: 'hidden',
    },
    statItem: {
      flex: 1,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statDivider: {
      width: 1,
      backgroundColor: colors.border,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 14,
      color: colors.subtext,
    },
    menuContainer: {
      padding: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 15,
      marginLeft: 5,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    menuText: {
      marginLeft: 15,
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    chevron: {
      color: colors.subtext,
    },
  }
  )
}