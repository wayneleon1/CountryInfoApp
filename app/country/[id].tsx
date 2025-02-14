import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Country } from '../../types';

interface DetailItemProps {
  label: string;
  value: string | number | undefined;
}

export default function CountryDetail() {
  const { country: countryString } = useLocalSearchParams<{ country: string }>();
  const country: Country = JSON.parse(countryString);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <View className="mb-4">
      <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}:
      </Text>
      <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
        {value || 'N/A'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <View className="px-4 py-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <ChevronLeftIcon size={24} color={isDark ? 'white' : 'black'} />
          <Text className={`ml-2 text-lg ${isDark ? 'text-white' : 'text-black'}`}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
          {country.name.common}
        </Text>

        <Image
          source={{ uri: country.flags.png }}
          className="w-full h-48 rounded-lg mb-6"
          resizeMode="cover"
        />

        <DetailItem label="Population" value={country.population.toLocaleString()} />
        <DetailItem label="Region" value={country.region} />
        <DetailItem label="Capital" value={country.capital?.[0]} />
        <DetailItem label="Languages" value={Object.values(country.languages || {}).join(', ')} />
        <DetailItem 
          label="Currency" 
          value={Object.values(country.currencies || {}).map(curr => curr.name).join(', ')} 
        />
        <DetailItem label="Time zone" value={country.timezones?.[0]} />
        <DetailItem 
          label="Dialing code" 
          value={`${country.idd.root}${country.idd.suffixes?.[0] || ''}`} 
        />
        <DetailItem label="Driving side" value={country.car?.side} />
      </ScrollView>
    </SafeAreaView>
  );
}