import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { XMarkIcon  } from 'react-native-heroicons/outline';
import React from 'react'
import { continents } from '@/constants/Continents';
import { timezones } from '@/constants/Timezones';

interface IFilterModalProp {
    isDark: boolean;
    showFilterModal: boolean;
    setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedContinents:string[];
    setSelectedContinents: React.Dispatch<React.SetStateAction<string[]>>
    selectedTimezones:string[];
    setSelectedTimezones: React.Dispatch<React.SetStateAction<string[]>>
}

const FilterModal = ({isDark,showFilterModal,setShowFilterModal,selectedContinents,setSelectedContinents,selectedTimezones,setSelectedTimezones}:IFilterModalProp) => {
     const toggleContinent = (continent: string) => {
        setSelectedContinents(prev =>
          prev.includes(continent)
            ? prev.filter(c => c !== continent)
            : [...prev, continent]
        );
      };

      const toggleTimezone = (timezone: string) => {
        setSelectedTimezones(prev =>
          prev.includes(timezone)
            ? prev.filter(t => t !== timezone)
            : [...prev, timezone]
        );
      };
    
      const resetFilters = () => {
        setSelectedContinents([]);
        setSelectedTimezones([]);
      };

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={showFilterModal}
    onRequestClose={() => setShowFilterModal(false)}
  >
    <View className="flex-1 bg-black/50">
      <View className={`flex-1 mt-4 rounded-t-3xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Filter</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <XMarkIcon size={24} color={isDark ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="p-4">
          <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Continent
          </Text>
          {continents.map((continent) => (
            <TouchableOpacity
              key={continent}
              className="flex-row items-center py-2"
              onPress={() => toggleContinent(continent)}
            >
              <View className={`w-6 h-6 rounded border-2 ${
                selectedContinents.includes(continent)
                  ? 'border-gray-400'
                  : isDark ? 'border-gray-400' : 'border-gray-300'
              } justify-center items-center`}>


                {selectedContinents.includes(continent) && (
                    
                  <View className={`w-3 h-3 ${isDark ? 'bg-white':'bg-black'} `} />
                )}

              </View>
              <Text className={`ml-3 text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                {continent}
              </Text>
            </TouchableOpacity>
          ))}

          <Text className={`text-xl font-bold mt-6 mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Time Zone
          </Text>
          {timezones.map((timezone) => (
            <TouchableOpacity
              key={timezone}
              className="flex-row items-center py-2"
              onPress={() => toggleTimezone(timezone)}
            >
              <View className={`w-6 h-6 rounded border-2 ${
                selectedTimezones.includes(timezone)
                  ? 'border-gray-400'
                  : isDark ? 'border-gray-400' : 'border-gray-300'
              } justify-center items-center`}>
                {selectedTimezones.includes(timezone) && (
                  <View className="w-3 h-3 bg-white" />
                )}
              </View>
              <Text className={`ml-3 text-lg ${isDark ? 'text-white' : 'text-black'}`}>
                {timezone}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="p-4 flex-row justify-between mt-auto">
          <TouchableOpacity
            onPress={resetFilters}
            className="flex-1 py-3 mr-2 rounded-lg border border-gray-300 items-center"
          >
            <Text className={isDark ? 'text-white' : 'text-black'}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowFilterModal(false)}
            className="flex-1 py-3 ml-2 rounded-lg bg-[#FF6C00] items-center"
          >
            <Text className="text-white">Show results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  )
}

export default FilterModal