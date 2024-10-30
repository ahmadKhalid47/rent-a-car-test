import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  name: "",
  gender: "",
  dateOfBirth: "",
  nationality: "",
  emailAddress: "",
  phone: "",
  alternativePhone: "",
  rentPerDay: "",
  streetAddress: "",
  country: "",
  state: "",
  city: "",
  postalCode: "",
  chauffeurImage: [],
  reference: [
    {
      refName: "",
      refPhone: "",
      refAddress: "",
      refRelation: "",
      refImages: [],
    },
  ],
  emergency: [
    {
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelation: "",
    },
  ],
  additional: "",
  passportNumber: "",
  passportValid: "",
  passportCountry: "",
  passportImages: [],
  licenseNumber: "",
  licenseValid: "",
  licenseCountry: "",
  licenseImages: [],
  other: false,
  otherNumber: "",
  otherValid: "",
  otherCountry: "",
  otherImages: [],
  employmentType: "",
  drivingExp: "",
  availability: "",
  idCard: false,
};

export const chauffeurSlice = createSlice({
  name: "chauffeur",
  initialState,
  reducers: {
    setnameR: (state, action) => {
      state.name = action.payload;
    },
    setgenderR: (state, action) => {
      state.gender = action.payload;
    },
    setdateOfBirthR: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setnationalityR: (state, action) => {
      state.nationality = action.payload;
    },
    setemailAddressR: (state, action) => {
      state.emailAddress = action.payload;
    },
    setphoneR: (state, action) => {
      state.phone = action.payload;
    },
    setalternativePhoneR: (state, action) => {
      state.alternativePhone = action.payload;
    },
    setrentPerDayR: (state, action) => {
      state.rentPerDay = action.payload;
    },
    setstreetAddressR: (state, action) => {
      state.streetAddress = action.payload;
    },
    setcountryR: (state, action) => {
      state.country = action.payload;
    },
    setstateR: (state, action) => {
      state.state = action.payload;
    },
    setcityR: (state, action) => {
      state.city = action.payload;
    },
    setpostalCodeR: (state, action) => {
      state.postalCode = action.payload;
    },
    setchauffeurImageR: (state, action) => {
      state.chauffeurImage = action.payload;
    },
    setrefNameR: (state, action) => {
      state.refName = action.payload;
    },
    setrefPhoneR: (state, action) => {
      state.refPhone = action.payload;
    },
    setrefAddressR: (state, action) => {
      state.refAddress = action.payload;
    },
    setrefRelationR: (state, action) => {
      state.refRelation = action.payload;
    },
    setemergencyNameR: (state, action) => {
      state.emergencyName = action.payload;
    },
    setemergencyPhoneR: (state, action) => {
      state.emergencyPhone = action.payload;
    },
    setemergencyRelationR: (state, action) => {
      state.emergencyRelation = action.payload;
    },
    setadditionalR: (state, action) => {
      state.additional = action.payload;
    },
    setpassportNumberR: (state, action) => {
      state.passportNumber = action.payload;
    },
    setpassportValidR: (state, action) => {
      state.passportValid = action.payload;
    },
    setpassportCountryR: (state, action) => {
      state.passportCountry = action.payload;
    },
    setpassportImagesR: (state, action) => {
      state.passportImages = action.payload;
    },
    setlicenseNumberR: (state, action) => {
      state.licenseNumber = action.payload;
    },
    setlicenseValidR: (state, action) => {
      state.licenseValid = action.payload;
    },
    setlicenseCountryR: (state, action) => {
      state.licenseCountry = action.payload;
    },
    setlicenseImagesR: (state, action) => {
      state.licenseImages = action.payload;
    },
    setotherNumberR: (state, action) => {
      state.otherNumber = action.payload;
    },
    setotherValidR: (state, action) => {
      state.otherValid = action.payload;
    },
    setotherCountryR: (state, action) => {
      state.otherCountry = action.payload;
    },
    setotherR: (state, action) => {
      state.other = action.payload;
    },
    setotherImagesR: (state, action) => {
      state.otherImages = action.payload;
    },
    setemploymentTypeR: (state, action) => {
      state.employmentType = action.payload;
    },
    setdrivingExpR: (state, action) => {
      state.drivingExp = action.payload;
    },
    setavailabilityR: (state, action) => {
      state.availability = action.payload;
    },
    setidCardR: (state, action) => {
      state.idCard = action.payload;
    },
    setAllValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetState: () => initialState,
    addContact: (state) => {
      state.emergency.push({
        emergencyName: "",
        emergencyPhone: "",
        emergencyRelation: "",
      });
    },
    updateContact: (state, action) => {
      const { index, contact } = action.payload;
      state.emergency[index] = contact;
    },
    removeContact: (state, action) => {
      state.emergency.splice(action.payload, 1);
    },
    addReference: (state) => {
      state.reference.push({
        refName: "",
        refPhone: "",
        refAddress: "",
        refRelation: "",
        refImages: [],
      });
    },
    updateReference: (state, action) => {
      const { index, contact } = action.payload;
      state.reference[index] = contact;
    },
    removeReference: (state, action) => {
      state.reference.splice(action.payload, 1);
    },
  },
});

export const {
  setnameR,
  setgenderR,
  setdateOfBirthR,
  setnationalityR,
  setemailAddressR,
  setphoneR,
  setalternativePhoneR,
  setrentPerDayR,
  setstreetAddressR,
  setcountryR,
  setstateR,
  setcityR,
  setpostalCodeR,
  setchauffeurImageR,
  setrefNameR,
  setrefPhoneR,
  setrefAddressR,
  setrefRelationR,
  setemergencyNameR,
  setemergencyPhoneR,
  setemergencyRelationR,
  setadditionalR,
  setpassportNumberR,
  setpassportValidR,
  setpassportCountryR,
  setpassportImagesR,
  setlicenseNumberR,
  setlicenseValidR,
  setlicenseCountryR,
  setlicenseImagesR,
  setAllValues,
  resetState,
  setemploymentTypeR,
  setdrivingExpR,
  setavailabilityR,
  setidCardR,
  setotherNumberR,
  setotherValidR,
  setotherCountryR,
  setotherImagesR,
  setotherR,
  addContact,
  updateContact,
  removeContact,
  addReference,
  removeReference,
  updateReference,
} = chauffeurSlice.actions;

export default chauffeurSlice.reducer;
