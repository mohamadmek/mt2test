import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const {width, height} = Dimensions.get('window');
const Location = () => {
  const [mapHeight, setMapHeight] = useState(height);
  let markers = [
    {
      latitude: 33.860234,
      longitude: 35.534517,
      title: 'MT2 - Mobile Technology Tomorrow',
      subtitle: 'Jisr El Bacha Street S & S building, 5th floor, Hazmiyeh',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: mapHeight,
      width: width,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        toolbarEnabled={true}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        pitchEnabled={true}
        showsMyLocationButton={true}
        // showsTraffic={true}
        showsIndoors={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 33.860234,
          longitude: 35.534517,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker
          onPress={() => setMapHeight(-0.08)}
          coordinate={{latitude: 33.860234, longitude: 35.534517}}
          title={'MT2 - Mobile Technology Tomorrow'}
          description={
            'Jisr El Bacha Street S & S building, 5th floor, Hazmiyeh'
          }></MapView.Marker>
      </MapView>
    </View>
  );
};

export default Location;
