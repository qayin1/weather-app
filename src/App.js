import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  theme,
  HStack,
  Input,
  Button,
  Center,
  Icon,
  Divider,
  Stack,
} from '@chakra-ui/react';
import './styles.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = '3c1e618e3fda58393e507c3ff8d094f7';
  const lang = 'pt_br';
  const temperature = weatherData ? Math.round(weatherData.main.temp) : 'N/A';
  const mintemp = weatherData ? Math.round(weatherData.main.temp_min) : 'N/A';
  const maxtemp = weatherData ? Math.round(weatherData.main.temp_max) : 'N/A';

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Não foi possível obter os dados meteorológicos');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const temperatureColor = temperature => {
    if (temperature <= 11) {
      return '#0000FF';
    } else if (temperature > 24) {
      return '#D2691E';
    } else if (temperature > 14) {
      return '#FFFF00';
    } else {
      return '#FFFFFF';
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Stack
        backgroundColor={'#1E90FF'}
        w={'100%'}
        h={'100%'}
        position={'relative'}
      >
        {isMobile ? (
          <></>
        ) : (
          <>
            <Box
              padding={'20px'}
              backgroundColor={'rgba(255, 255, 255, 0.5)'}
              backdropFilter={'blur(10px)'}
              borderRadius={'50%'}
              position={'absolute'}
              bottom={'300px'}
              right={'400px'}
              height={'150px'}
              width={'150px'}
            ></Box>
            <Box
              padding={'20px'}
              backgroundColor={'rgba(255, 255, 255, 0.5)'}
              borderRadius={'50%'}
              position={'absolute'}
              top={'300px'}
              left={'400px'}
              height={'150px'}
              width={'150px'}
            ></Box>
            <Box
              padding={'20px'}
              backgroundColor={'rgba(255, 255, 255, 0.5)'}
              borderRadius={'50%'}
              position={'absolute'}
              top={'100px'}
              right={'400px'}
              height={'150px'}
              width={'150px'}
            ></Box>
            <Box
              padding={'20px'}
              backgroundColor={'rgba(255, 255, 255, 0.5)'}
              borderRadius={'50%'}
              position={'absolute'}
              bottom={'100px'}
              left={'600px'}
              height={'150px'}
              width={'150px'}
            ></Box>
            <Box
              padding={'20px'}
              backgroundColor={'rgba(255, 255, 255, 0.5)'}
              borderRadius={'50%'}
              position={'absolute'}
              top={'50px'}
              left={'800px'}
              height={'150px'}
              width={'150px'}
            ></Box>
          </>
        )}
        <Center minH="100vh">
          <VStack spacing={4}>
            <VStack
              h={isMobile ? '100vh' : '50vh'}
              w={isMobile ? '100vw' : '50vw'}
              padding={'40px'}
              borderRadius={isMobile ? '0px' : '40px'}
              className="transparent-blur-background"
              alignContent={'center'}
              justifyContent={'center'}
              boxShadow={'dark-lg'}
            >
              <HStack>
                <Input
                  placeholder="Enter a city name"
                  _placeholder={{ color: '#FFFFFF' }}
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  border={'2px'}
                />
                <Button onClick={fetchWeatherData}>Search</Button>
              </HStack>
              {weatherData && (
                <VStack>
                  <Text fontSize={'30px'} fontWeight={'bold'} color={'#FFFFFF'}>
                    {weatherData.name}
                  </Text>
                  <Text fontSize={'16px'} fontWeight={'bold'} color={'#FFFFFF'}>
                    {capitalizeFirstLetter(weatherData.weather[0].main)}
                  </Text>

                  <Text fontSize={'16px'} fontWeight={'bold'} color={'#FFFFFF'}>
                    {capitalizeFirstLetter(weatherData.weather[0].description)}
                  </Text>

                  <img
                    src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                    alt=""
                    color="#white"
                  />
                  <Text fontSize={'30px'} color={temperatureColor(temperature)}>
                    {temperature}°C
                  </Text>
                  <HStack>
                    <VStack>
                      <Text fontSize={'16px'} color={'#FFFFFF'}>
                        Min: {mintemp}°C
                      </Text>
                    </VStack>
                    <Divider />
                    <VStack>
                      <Text fontSize={'16px'} color={'#FFFFFF'}>
                        Max: {maxtemp}°C
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              )}
            </VStack>
          </VStack>
        </Center>
      </Stack>
    </ChakraProvider>
  );
}

export default App;
