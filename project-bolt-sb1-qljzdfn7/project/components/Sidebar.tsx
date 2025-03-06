import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Chrome as Home, Phone, Hospital, User, Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, FadeInRight, FadeOutRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const { signOut } = useAuth();
  const translateX = useSharedValue(width);
  const overlayOpacity = useSharedValue(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (isOpen) {
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      overlayOpacity.value = withTiming(0.5, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      translateX.value = withTiming(width, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      });
      overlayOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path);
  };

  const handleLogout = async () => {
    onClose();
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      icon: Home,
      title: 'Home',
      onPress: () => handleNavigation('/(tabs)'),
    },
    {
      icon: Phone,
      title: 'Emergency',
      onPress: () => handleNavigation('/emergency'),
    },
    {
      icon: Hospital,
      title: 'Hospitals',
      onPress: () => handleNavigation('/hospitals'),
    },
    {
      icon: User,
      title: 'Profile',
      onPress: () => handleNavigation('/profile'),
    },
    {
      icon: Bell,
      title: 'Notifications',
      onPress: () => handleNavigation('/notifications'),
    },
    {
      icon: Shield,
      title: 'Safety Tips',
      onPress: () => handleNavigation('/safety-tips'),
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      onPress: () => handleNavigation('/help'),
    },
    {
      icon: Settings,
      title: 'Settings',
      onPress: () => handleNavigation('/settings'),
    },
  ];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#000',
      zIndex: 10,
    },
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: width * 0.75,
      maxWidth: 300,
      height: '100%',
      backgroundColor: colors.surface,
      zIndex: 20,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: -2, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    header: {
      overflow: 'hidden',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerGradient: {
      padding: 20,
      paddingTop: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
    },
    closeButton: {
      padding: 5,
    },
    content: {
      flex: 1,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuText: {
      marginLeft: 15,
      fontSize: 16,
      color: colors.text,
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: colors.error,
      borderRadius: 12,
      justifyContent: 'center',
    },
    logoutText: {
      marginLeft: 10,
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  if (!isOpen && translateX.value === width) {
    return null;
  }

  return (
    <>
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.header}>
          <LinearGradient
            colors={colors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}>
            <Text style={styles.headerTitle}>PRANA</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#fff" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <ScrollView style={styles.content}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={index}
              entering={FadeInRight.delay(100 + index * 50).springify()}
              exiting={FadeOutRight.springify()}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={item.onPress}>
                <item.icon size={24} color={colors.primary} />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#fff" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}