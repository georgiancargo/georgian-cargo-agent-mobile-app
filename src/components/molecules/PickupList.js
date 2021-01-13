import React from "react";
// import {useState} from "react";
import {SafeAreaView} from "react-native";
import {FlatList, Text, View} from "react-native";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import {TouchableOpacity} from "react-native";
// import {ModalContainer, Button} from "_atoms";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const {s, c} = bootstrapStyleSheet;

const PickupList = ({parcels, editParcel, removeParcel}) => {
    const RenderItem = ({item, index}) => {
        const {sender, receiver, ...parcel} = item;
        const edit = () => {
            editParcel(index, parcel, receiver);
            // console.log(item);
        };
        return (
            <View
                style={[s.tableRow, s.tableStripedRow(index)]}
                key={parcel.tracking_number}
            >
                <View style={[s.tableHeadCol, s.flex3, s.justifyContentCenter]}>
                    <TouchableOpacity onPress={edit}>
                        <Text>{parcel.tracking_number}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[s.tableHeadCol, s.flex3]}>
                    <TouchableOpacity onPress={edit}>
                        <Text style={[s.text]}>{receiver.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[s.tableHeadCol, s.flex1, s.justifyContentCenter]}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => removeParcel(index)}
                    >
                        <Text style={{color: "red", fontWeight: "bold"}}>
                            X
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <>
            <SafeAreaView>
                {parcels.length ? (
                    <>
                        <Header />
                        {parcels.map((parcel, i) => (
                            <RenderItem
                                item={parcel}
                                index={i}
                                key={parcel.tracking_number + i}
                            />
                        ))}
                    </>
                ) : // <FlatList
                //     data={parcels}
                //     style={[s.table]}
                //     ListHeaderComponent={Header}
                //     renderItem={renderItem}
                //     keyExtractor={(item) => item.id}
                // />
                null}
            </SafeAreaView>
        </>
    );
};

const Header = () => {
    return (
        <View style={[s.tableHead]}>
            <View style={[s.tableHeadCol]}>
                <Text style={[s.text, s.flex3]}>#</Text>
            </View>
            <View style={[s.tableHeadCol, s.flex3]}>
                <Text style={[s.text, s.textCenter]}>Receiver</Text>
            </View>
            <View style={[s.tableHeadCol, s.flex1]}>
                <Text style={[s.text]} />
            </View>
        </View>
    );
};
// const PickupModal = ({parcels, editParcel, removeParcel}) => {
//     const btnGroup = {flex: 1, borderRadius: 20, marginRight: 5};

//     const [visible, setVisible] = useState(false);

//     const showModal = () => setVisible(true);
//     const hideModal = () => setVisible(false);

//     return (
//         <View style={{marginVertical: 5}}>
//             <Button
//                 style={btnGroup}
//                 onPress={showModal}
//                 disabled={!parcels.length}
//             >
//                 Show parcel list
//             </Button>
//             <ModalContainer modalVisible={visible} setModalVisible={setVisible}>
//                 <View style={{flex: 1}}>
//                     <PickupList
//                         parcels={parcels}
//                         editParcel={editParcel}
//                         removeParcel={removeParcel}
//                     />
//                     <Button onPress={hideModal}>Done</Button>
//                 </View>
//             </ModalContainer>
//         </View>
//     );
// };
// export default PickupModal;
export default PickupList;
