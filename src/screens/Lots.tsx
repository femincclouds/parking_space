import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { style } from "../styles/screens";

type lotsPropsType = {
  route: {
    params: {
      lots: number;
    };
  };
};

const Lots: FC<lotsPropsType> = (props) => {
  const [lotsList, setLotsList] = useState<any[]>([]);
  const [currentLot, setCurrentLot] = useState<number>(0);
  const [freeLotsList, setFreeLotsList] = useState<any[]>(lotsList);
  const [reg, setReg] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [regid, setRegid] = useState<any>();
  const [startTime, setStartTime] = useState<number>(0);

  const [hrs, setHrs] = useState<number>(0);
  const [amnt, setAmnt] = useState<number>(0);

  useEffect(() => {
    drawLots();
  }, []);

  useEffect(() => {
    setFreeLotsList(lotsList.filter((lot) => lot.free));
  }, [lotsList]);

  const drawLots = () => {
    let lotsArray = [];
    for (let i = 1; i <= props.route.params.lots; i++) {
      lotsArray.push({
        id: i,
        reg: "",
        free: true,
        start: new Date(0, 0, 0),
      });
    }
    setLotsList(lotsArray);
  };

  const getRandom = () => {
    const randomNum = Math.floor(Math.random() * freeLotsList.length);
    setCurrentLot(freeLotsList[randomNum].id);
  };

  const handleAdd = (random: boolean) => {
    setReg("");
    if (freeLotsList.length > 0) {
      startCount();
      if (random) {
        getRandom();
      }
      if (currentLot >= 0) {
        setShowAddModal(true);
      }
    } else {
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 2000);
    }
  };

  const handleRemove = (reg: any) => {
    !lotsList[currentLot].free && setShowRemoveModal(true);
    setRegid(reg);
  };

  const startCount = () => {
    const start = new Date().getSeconds();
    setStartTime(start);
  };

  const calculateHrsAmt = () => {
    // const timeDiffms = Math.abs(
    //   lotsList[currentLot].start.getTime() - new Date().getTime()
    // );
    // const timeDiffHrs = Math.floor(timeDiffms / (1000 * 60 * 60));
    // setHrs(timeDiffHrs);

    const end = new Date().getSeconds();
    const totalTime = (startTime - end) / (60 * 60);
    if (totalTime / 60 <= 2) {
      setAmnt(10);
      setHrs(totalTime);
    } else {
      setAmnt(10 + (totalTime - 2) * 10);
    }
  };

  return (
    <>
      <View style={style.container2}>
        <TouchableOpacity style={style.getSpot} onPress={() => handleAdd(true)}>
          <Text style={style.getSpotText}>Get A Parking Spot</Text>
        </TouchableOpacity>
        <Snackbar
          visible={showSnack}
          onDismiss={() => setShowSnack(false)}
          style={style.snack}
        >
          <Text style={style.snackText}>Parking is full</Text>
        </Snackbar>
        <Modal visible={showAddModal} animationType="slide">
          <View style={style.modal}>
            <Text style={style.info}>Add Vehicle to P{currentLot}</Text>
            <TextInput
              placeholder="Enter reg. number"
              placeholderTextColor="grey"
              onChangeText={(text) => {
                setReg(text);
              }}
              style={style.input}
            />

            <View style={style.buttonRow}>
              <Button
                disabled={reg.length === 0}
                title="Add"
                onPress={() => {
                  if (reg.length) {
                    setLotsList(
                      lotsList.map((lot) => {
                        return lot.id === currentLot
                          ? {
                              ...lot,
                              free: false,
                              reg: reg,
                              start: new Date(),
                            }
                          : lot;
                      })
                    );
                    setShowAddModal(false);
                  }
                }}
              />
              <Button
                title="Cancel"
                onPress={() => {
                  setShowAddModal(false);
                }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          visible={showRemoveModal}
          onShow={() => {
            calculateHrsAmt();
          }}
          animationType="slide"
        >
          <View style={style.modal}>
            <Text style={style.rawText}>
              Pay and Remove Vehicle from P{currentLot}
            </Text>
            <Text style={style.rawText}>Total hours: {hrs} mins</Text>
            <Text style={style.rawText}>Total Amount:{amnt}</Text>

            <View style={style.buttonRow}>
              <Button
                title="Remove"
                onPress={() => {
                  const flag = false;
                  axios
                    .post("https://httpstat.us/200", {
                      car_registration: regid,
                      charge: amnt,
                    })
                    .then((res: any) => {});
                  setLotsList(
                    lotsList.map((lot) => {
                      return lot.id === currentLot
                        ? {
                            ...lot,
                            free: true,
                            reg: "",
                            start: new Date(0, 0, 0),
                          }
                        : lot;
                    })
                  );
                  setAmnt(0);
                  setHrs(0);
                  setShowRemoveModal(false);
                }}
              />
              <Button
                title="Cancel"
                onPress={() => {
                  setAmnt(0);
                  setHrs(0);
                  setShowRemoveModal(false);
                }}
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={style.lots}>
          <FlatList
            data={lotsList}
            horizontal={false}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setCurrentLot(item.id);
                  !item.free && handleRemove(item.reg),
                    !item.free && setShowRemoveModal(true);
                }}
              >
                <View
                  style={{
                    ...style.item,
                    backgroundColor: item.free ? "#38b000" : "#d00000",
                    borderRadius: 5,
                    padding: 5,
                    width: "150px",
                    height: "100px",
                    margin: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={style.itemText}>P{item.id}</Text>
                  <Text style={style.itemText}>
                    {item.free ? "Free" : `Occupied by ${item.reg}`}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Lots;
