import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { Bell, MapPin, Store, Volume2, Moon, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>PB</Text>
          </View>
          <Text style={styles.pharmacyName}>Pharmacie du Baobab</Text>
          <Text style={styles.pharmacyAddress}>Rue 10 Angle 13, Dakar, Sénégal</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={Colors.primary[600]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Recevoir des notifications de demandes de médicaments</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.neutral[300], true: Colors.primary[500] }}
              thumbColor={Colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Volume2 size={20} color={Colors.primary[600]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Sons</Text>
              <Text style={styles.settingDescription}>Activer les alertes sonores</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: Colors.neutral[300], true: Colors.primary[500] }}
              thumbColor={Colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MapPin size={20} color={Colors.primary[600]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Partage de localisation</Text>
              <Text style={styles.settingDescription}>Permettre aux patients de voir votre localisation</Text>
            </View>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
              trackColor={{ false: Colors.neutral[300], true: Colors.primary[500] }}
              thumbColor={Colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Moon size={20} color={Colors.primary[600]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Mode sombre</Text>
              <Text style={styles.settingDescription}>Activer le thème sombre</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: Colors.neutral[300], true: Colors.primary[500] }}
              thumbColor={Colors.white}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.settingIconContainer}>
              <Store size={20} color={Colors.primary[600]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Profil de la pharmacie</Text>
              <Text style={styles.settingDescription}>Modifier vos informations et horaires</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.accountItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={Colors.primary[600]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Aide et support</Text>
              <Text style={styles.settingDescription}>FAQ, contact et tutoriels</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color={Colors.error[600]} />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>MediFinder v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 MediFinder. Tous droits réservés.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary[600],
  },
  pharmacyName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
  section: {
    backgroundColor: Colors.white,
    marginVertical: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[700],
    padding: 16,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.neutral[500],
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.error[600],
    marginLeft: 8,
  },
  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: Colors.neutral[500],
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: Colors.neutral[400],
  },
});