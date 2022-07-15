import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { Button, SafeAreaView, TextInput } from "react-native";
import { style } from "../styles/screens";
import { routesType } from "../types/common";

const Home: FC = () => {
  const [lots, setLots] = useState<number>(0);

  const navigation = useNavigation<NativeStackNavigationProp<routesType>>();

  const handlePress = () => {
    navigation.navigate("Lots", { lots: lots });
  };

  return (
    <SafeAreaView testID="home" style={style.container}>
      <TextInput
        placeholder="Enter number of Parking Lots"
        placeholderTextColor="grey"
        keyboardType="numeric"
        onChangeText={(text) => setLots(Number(text))}
        style={style.input}
      />
      <Button disabled={lots == 0} title="Submit" onPress={handlePress} />
    </SafeAreaView>
  );
};

export default Home;
