import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SectionList, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MoonIcon, SunIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import { Country, GroupedCountries } from '../types';

export default function Home() {
  const [countries, setCountries] = useState<GroupedCountries[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data: Country[] = await response.json();
      const sortedCountries = data.sort((a, b) => 
        a.name.common.localeCompare(b.name.common)
      );
      const grouped = groupCountriesByLetter(sortedCountries);
      setCountries(grouped);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const groupCountriesByLetter = (countries: Country[]): GroupedCountries[] => {
    const grouped = countries.reduce((acc: { [key: string]: Country[] }, country) => {
      const firstLetter = country.name.common.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(country);
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([letter, countries]) => ({
        title: letter,
        data: countries,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  };

  const filterCountries = (query: string): GroupedCountries[] => {
    if (!query) return countries;

    return countries.map(section => ({
      title: section.title,
      data: section.data.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      ),
    })).filter(section => section.data.length > 0);
  };

  const renderSectionHeader = ({ section }: { section: GroupedCountries }) => (
    <View className={`px-4 py-2 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
        {section.title}
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      className={`flex-row items-center px-4 py-2 `}
      onPress={() => router.push({
        pathname: '/country/[id]',
        params: { id: item.cca3, country: JSON.stringify(item) }
      })}
    >
      <Image
        source={{ uri: item.flags.png }}
        className="w-12 h-8 rounded"
        resizeMode="cover"
      />
      <View className="ml-4">
        <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          {item.name.common}
        </Text>
        <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {item.capital?.[0] || 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="px-4 py-2">
        <View className="flex-row items-center justify-between">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Explore <View className='w-1 h-1 rounded-full bg-[#FF6C00]'></View>
          </Text>
          <TouchableOpacity onPress={toggleColorScheme}>
            {isDark ? (
              <SunIcon size={24} color="white" />
            ) : (
              <MoonIcon size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        
        <View className={`flex-row items-center mt-4 px-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <MagnifyingGlassIcon size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
          <TextInput
            className={`flex-1 py-3 px-2 ${isDark ? 'text-white' : 'text-black'}`}
            placeholder="Search Country"
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <SectionList
        sections={filterCountries(searchQuery)}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.cca3}
        className="flex-1"
      />
    </SafeAreaView>
  );
}