import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import React from 'react'
import { languages } from '@/constants/Languages';

interface ILanguageModalProp {
    isDark: boolean;
    showLanguageModal: boolean;
    setShowLanguageModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedLanguage:string;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>
}

const LanguageModal = ({isDark,setShowLanguageModal,showLanguageModal,selectedLanguage,setSelectedLanguage}:ILanguageModalProp) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={showLanguageModal}
    onRequestClose={() => setShowLanguageModal(false)}
  >
    <View className="flex-1 bg-black/50">
      <View className={`flex-1 mt-24 rounded-t-3xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Languages</Text>
            <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
              <XMarkIcon size={24} color={isDark ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-4">
          {languages.map((language) => (
            <TouchableOpacity
              key={language}
              className="flex-row items-center py-2"
              onPress={() => {
                setSelectedLanguage(language);
                setShowLanguageModal(false);
              }}
            >
              <View className={`w-6 h-6 rounded-full border-2 ${
                selectedLanguage === language 
                  ? 'border-gray-400' 
                  : isDark ? 'border-gray-400' : 'border-gray-300'
              } justify-center items-center`}>
                {selectedLanguage === language && (
                  <View className="w-3 h-3 rounded-full bg-white" />
                )}
              </View>
              <Text className={`ml-3 text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </Modal>
  )
}

export default LanguageModal