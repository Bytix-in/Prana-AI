import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Bell, TriangleAlert as AlertTriangle, Info, CircleCheck as CheckCircle, Clock, ChevronRight } from 'lucide-react-native';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FadeIn from '../components/FadeIn';
import Animated, { FadeInDown } from 'react-native-reanimated';

const notifications = [
  {
    id: 1,
    title: 'Cyclone Warning',
    message: 'Cyclone Yaas approaching Odisha coast. Stay alert and follow safety guidelines.',
    type: 'alert',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    title: 'Medical Reminder',
    message: 'Don\'t forget to update your medical information and emergency contacts.',
    type: 'info',
    time: '1 day ago',
    read: false
  },
  {
    id: 3,
    title: 'Emergency Contact Added',
    message: 'Dr. Patel has been added to your emergency contacts list.',
    type: 'success',
    time: '2 days ago',
    read: true
  },
  {
    id: 4,
    title: 'App Update Available',
    message: 'A new version of PRANA is available with improved emergency features.',
    type: 'info',
    time: '3 days ago',
    read: true
  },
  {
    id: 5,
    title: 'Flood Alert',
    message: 'Heavy rainfall expected in Bhubaneswar. Be prepared for possible flooding.',
    type: 'alert',
    time: '4 days ago',
    read: true
  }
];

export default function Notifications() {
  const { colors } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [readNotifications, setReadNotifications] = useState<number[]>(
    notifications.filter(n => n.read).map(n => n.id)
  );

  const markAsRead = (id: number) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id]);
    }
  };

  const markAllAsRead = () => {
    setReadNotifications(notifications.map(n => n.id));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={24} color={colors.error} />;
      case 'info':
        return <Info size={24} color={colors.primary} />;
      case 'success':
        return <CheckCircle size={24} color="#4CD964" />;
      default:
        return <Bell size={24} color={colors.primary} />;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    markAllButton: {
      padding: 8,
    },
    markAllText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    notificationCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      margin: 15,
      marginBottom: 10,
      padding: 15,
      flexDirection: 'row',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    unreadIndicator: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
      position: 'absolute',
      top: 15,
      right: 15,
    },
    notificationIcon: {
      marginRight: 15,
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    notificationMessage: {
      fontSize: 14,
      color: colors.subtext,
      marginBottom: 10,
    },
    notificationTime: {
      fontSize: 12,
      color: colors.subtext,
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeText: {
      marginLeft: 5,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyStateIcon: {
      backgroundColor: colors.surface,
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
      textAlign: 'center',
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: colors.subtext,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Notifications" 
        onMenuPress={() => setIsSidebarOpen(true)} 
      />
      
      {notifications.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={{ fontSize: 16, color: colors.subtext }}>
              {notifications.length} Notifications
            </Text>
            <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            {notifications.map((notification, index) => {
              const isRead = readNotifications.includes(notification.id);
              
              return (
                <FadeIn key={notification.id} delay={index * 100}>
                  <TouchableOpacity 
                    style={[
                      styles.notificationCard,
                      { opacity: isRead ? 0.8 : 1 }
                    ]}
                    onPress={() => markAsRead(notification.id)}>
                    {!isRead && <View style={styles.unreadIndicator} />}
                    
                    <View style={styles.notificationIcon}>
                      {getIconForType(notification.type)}
                    </View>
                    
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <Text style={styles.notificationMessage}>{notification.message}</Text>
                      <View style={styles.notificationTime}>
                        <Clock size={12} color={colors.subtext} />
                        <Text style={styles.timeText}>{notification.time}</Text>
                      </View>
                    </View>
                    
                    <ChevronRight size={20} color={colors.subtext} />
                  </TouchableOpacity>
                </FadeIn>
              );
            })}
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Animated.View 
            entering={FadeInDown.delay(200)}
            style={styles.emptyStateIcon}>
            <Bell size={40} color={colors.primary} />
          </Animated.View>
          <Text style={styles.emptyStateText}>No Notifications</Text>
          <Text style={styles.emptyStateSubtext}>
            You're all caught up! We'll notify you when there are new alerts or updates.
          </Text>
        </View>
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </View>
  );
}