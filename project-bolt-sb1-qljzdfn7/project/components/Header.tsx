import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, Bell } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuPress: () => void;
}

export default function Header({ title, subtitle, onMenuPress }: HeaderProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    gradient: {
      paddingTop: 40,
      paddingBottom: 15,
      paddingHorizontal: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    subtitle: {
      fontSize: 16,
      color: '#fff',
      opacity: 0.8,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    notificationBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.error,
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
  });

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(500)}>
      <LinearGradient
        colors={colors.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={styles.row}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={20} color="#fff" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
              <Menu size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}