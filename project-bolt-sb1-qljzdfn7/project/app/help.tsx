import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CircleHelp as HelpCircle, ChevronDown, ChevronUp, Phone, Mail, Globe } from 'lucide-react-native';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FadeIn from '../components/FadeIn';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

const faqs = [
  {
    id: 1,
    question: 'How do I use the SOS emergency feature?',
    answer: 'The SOS emergency feature can be accessed from the home screen or emergency tab. Tap the red SOS button to initiate an emergency call to your primary emergency contact and send your current location to all your emergency contacts.'
  },
  {
    id: 2,
    question: 'How do I add emergency contacts?',
    answer: 'Go to the Profile tab, select "Emergency Contacts", and tap the "Add Emergency Contact" button. You can add contacts from your phone book or enter details manually.'
  },
  {
    id: 3,
    question: 'Can I use PRANA offline?',
    answer: 'Yes, PRANA has limited offline functionality. You can access emergency contacts and some safety tips without an internet connection. However, features like location sharing and hospital search require internet connectivity.'
  },
  {
    id: 4,
    question: 'How do I update my medical information?',
    answer: 'Go to the Profile tab, select "Medical History", and tap "Edit" to update your medical information including allergies, medications, blood group, and medical conditions.'
  },
  {
    id: 5,
    question: 'Is my data secure?',
    answer: 'Yes, PRANA takes your privacy seriously. All your personal and medical information is encrypted and securely stored. We do not share your data with third parties without your explicit consent.'
  }
];

export default function Help() {
  const { colors } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
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
    },
    bannerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
    },
    bannerText: {
      fontSize: 16,
      color: '#fff',
      opacity: 0.9,
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      margin: 15,
      marginBottom: 10,
    },
    faqCard: {
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
    faqHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    faqQuestion: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
      marginRight: 10,
    },
    faqAnswer: {
      padding: 15,
      paddingTop: 0,
      paddingBottom: 20,
    },
    faqAnswerText: {
      fontSize: 16,
      color: colors.subtext,
      lineHeight: 24,
    },
    contactSection: {
      margin: 15,
    },
    contactCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    contactIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    contactInfo: {
      flex: 1,
    },
    contactTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    contactValue: {
      fontSize: 14,
      color: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Help & Support" 
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
            <Text style={styles.bannerTitle}>How can we help you?</Text>
            <Text style={styles.bannerText}>
              Find answers to frequently asked questions or contact our support team for assistance.
            </Text>
          </LinearGradient>
        </Animated.View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        {faqs.map((faq, index) => (
          <FadeIn key={faq.id} delay={index * 100 + 300}>
            <View style={styles.faqCard}>
              <TouchableOpacity 
                style={styles.faqHeader} 
                onPress={() => toggleFaq(faq.id)}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                {expandedFaq === faq.id ? 
                  <ChevronUp size={20} color={colors.primary} /> : 
                  <ChevronDown size={20} color={colors.primary} />
                }
              </TouchableOpacity>
              
              {expandedFaq === faq.id && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          </FadeIn>
        ))}

        <Text style={styles.sectionTitle}>Contact Us</Text>
        
        <View style={styles.contactSection}>
          <FadeIn delay={800}>
            <View style={styles.contactCard}>
              <View style={styles.contactIcon}>
                <Phone size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Phone Support</Text>
                <Text style={styles.contactValue}>+91 1800-123-4567</Text>
              </View>
            </View>
          </FadeIn>
          
          <FadeIn delay={900}>
            <View style={styles.contactCard}>
              <View style={styles.contactIcon}>
                <Mail size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Email Support</Text>
                <Text style={styles.contactValue}>support@prana-app.com</Text>
              </View>
            </View>
          </FadeIn>
          
          <FadeIn delay={1000}>
            <View style={styles.contactCard}>
              <View style={styles.contactIcon}>
                <Globe size={20} color={colors.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Website</Text>
                <Text style={styles.contactValue}>www.prana-app.com</Text>
              </View>
            </View>
          </FadeIn>
        </View>
      </ScrollView>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </View>
  );
}