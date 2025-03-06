import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { Send, X, Bot, Calendar, Phone, Hospital } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInRight, 
  SlideOutRight 
} from 'react-native-reanimated';
import AnimatedPressable from './AnimatedPressable';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  isVisible: boolean;
  onClose: () => void;
}

// Sample quick replies for the chatbot
const quickReplies = [
  { id: 'emergency', text: 'Emergency Help', icon: Phone },
  { id: 'appointment', text: 'Book Appointment', icon: Calendar },
  { id: 'hospitals', text: 'Nearby Hospitals', icon: Hospital },
];

export default function ChatBot({ isVisible, onClose }: ChatBotProps) {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m PRANA Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (replyId: string) => {
    let replyText = '';
    
    switch(replyId) {
      case 'emergency':
        replyText = 'I need emergency assistance';
        break;
      case 'appointment':
        replyText = 'I want to book an appointment';
        break;
      case 'hospitals':
        replyText = 'Show me nearby hospitals';
        break;
      default:
        replyText = 'Help me';
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: replyText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(replyText);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let responseText = '';

    if (input.includes('emergency') || input.includes('help') || input.includes('urgent')) {
      responseText = 'For immediate emergency assistance, please tap the SOS button on the home screen or call our emergency hotline at 108. What kind of emergency are you facing?';
    } else if (input.includes('appointment') || input.includes('book') || input.includes('doctor')) {
      responseText = 'I can help you book an appointment. Please provide the following details:\n1. Preferred hospital\n2. Department/Specialist\n3. Preferred date and time';
    } else if (input.includes('hospital') || input.includes('nearby') || input.includes('close')) {
      responseText = 'I can show you nearby hospitals. Based on your current location, AIIMS Bhubaneswar (2.5 km) and Capital Hospital (3.8 km) are closest to you. Would you like directions to either of these hospitals?';
    } else if (input.includes('ambulance')) {
      responseText = 'To request an ambulance, please tap the "Request Ambulance" button on the Emergency screen or call 108. Would you like me to initiate an ambulance request for you?';
    } else if (input.includes('thank')) {
      responseText = 'You\'re welcome! Is there anything else I can help you with?';
    } else {
      responseText = 'I\'m here to help with emergency services, hospital information, and appointment bookings. Could you please provide more details about what you need?';
    }

    return {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
    };
  };

  if (!isVisible) return null;

  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '80%',
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      zIndex: 1001,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
      textAlign: 'center',
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messagesContainer: {
      flex: 1,
      padding: 15,
    },
    typingIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 10,
    },
    typingText: {
      marginLeft: 10,
      color: colors.subtext,
      fontSize: 14,
    },
    messageRow: {
      flexDirection: 'row',
      marginBottom: 15,
      alignItems: 'flex-end',
    },
    userMessageRow: {
      justifyContent: 'flex-end',
    },
    botMessageRow: {
      justifyContent: 'flex-start',
    },
    botAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    messageBubble: {
      maxWidth: '80%',
      padding: 12,
      borderRadius: 16,
    },
    userMessageBubble: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: 4,
    },
    botMessageBubble: {
      backgroundColor: colors.background,
      borderBottomLeftRadius: 4,
    },
    messageText: {
      fontSize: 16,
      lineHeight: 22,
    },
    userMessageText: {
      color: '#fff',
    },
    botMessageText: {
      color: colors.text,
    },
    timestamp: {
      fontSize: 12,
      marginTop: 5,
      alignSelf: 'flex-end',
    },
    userTimestamp: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    botTimestamp: {
      color: colors.subtext,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.surface,
    },
    input: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginRight: 10,
      fontSize: 16,
      color: colors.text,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quickRepliesContainer: {
      flexDirection: 'row',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.surface,
      justifyContent: 'space-around',
    },
    quickReplyButton: {
      backgroundColor: colors.background,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickReplyText: {
      marginLeft: 5,
      color: colors.text,
      fontSize: 14,
    },
  });

  return (
    <>
      <Animated.View 
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>
      
      <Animated.View 
        entering={SlideInRight.springify()}
        exiting={SlideOutRight.springify()}
        style={styles.container}>
        <View style={styles.header}>
          <View style={styles.botAvatar}>
            <Bot size={20} color={colors.primary} />
          </View>
          <Text style={styles.headerTitle}>PRANA Assistant</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={{ paddingBottom: 10 }}>
            {messages.map((message) => (
              <Animated.View
                key={message.id}
                entering={FadeIn.duration(300).delay(100)}
                style={[
                  styles.messageRow,
                  message.sender === 'user' ? styles.userMessageRow : styles.botMessageRow,
                ]}>
                {message.sender === 'bot' && (
                  <View style={styles.botAvatar}>
                    <Bot size={20} color={colors.primary} />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.sender === 'user'
                      ? styles.userMessageBubble
                      : styles.botMessageBubble,
                  ]}>
                  <Text
                    style={[
                      styles.messageText,
                      message.sender === 'user'
                        ? styles.userMessageText
                        : styles.botMessageText,
                    ]}>
                    {message.text}
                  </Text>
                  <Text
                    style={[
                      styles.timestamp,
                      message.sender === 'user'
                        ? styles.userTimestamp
                        : styles.botTimestamp,
                    ]}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </Animated.View>
            ))}
            
            {isTyping && (
              <View style={styles.typingIndicator}>
                <View style={styles.botAvatar}>
                  <Bot size={20} color={colors.primary} />
                </View>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.typingText}>PRANA Assistant is typing...</Text>
              </View>
            )}
          </ScrollView>
          
          <View style={styles.quickRepliesContainer}>
            {quickReplies.map((reply) => (
              <AnimatedPressable
                key={reply.id}
                style={styles.quickReplyButton}
                onPress={() => handleQuickReply(reply.id)}>
                <reply.icon size={16} color={colors.primary} />
                <Text style={styles.quickReplyText}>{reply.text}</Text>
              </AnimatedPressable>
            ))}
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor={colors.subtext}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <AnimatedPressable style={styles.sendButton} onPress={handleSend}>
              <Send size={20} color="#fff" />
            </AnimatedPressable>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
}