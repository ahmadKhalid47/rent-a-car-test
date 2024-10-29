"use client";
import React, { useEffect, useState } from "react";
import { TempTypeInput, TypeInput } from "../../Components/InputComponents/TypeInput";
import {
  SelectInput,
  TempSelectInput,
} from "../../Components/InputComponents/SelectInput";
import {
  setrefNameR,
  setrefPhoneR,
  setrefAddressR,
  setrefRelationR,
  setemergencyContactNameR,
  setemergencyContactPhoneR,
  setemergencyContactRelationR,
  setadditionalR,
} from "@/app/store/chauffeur";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { FaAsterisk, FaTimes } from "react-icons/fa";

export default function Feature() {
  let chauffeur = useSelector((state: RootState) => state.chauffeur);
  let dispatch = useDispatch();
  let [other, setOther] = useState("");
  let [other2, setOther2] = useState("");
  let [popUp, setPopUp] = useState(false);
  let [popUp2, setPopUp2] = useState(false);

  useEffect(() => {
    if (chauffeur.refRelation === "Other") setPopUp(true);
  }, [chauffeur.refRelation]);

  useEffect(() => {
    if (chauffeur.emergencyContactRelation === "Other") setPopUp2(true);
  }, [chauffeur.emergencyContactRelation]);

  return (
    <div className="w-full h-fit  ">
      <div className="flex flex-wrap justify-start items-start gap-x-[4%] gap-y-5 w-full h-fit dark:bg-dark1 bg-white mt-5 rounded-[10px] border-2 border-grey px-1 xs:px-3 md:px-11 py-8">
        <span className="flex justify-start gap-1 items-center font-[600] text-[20px] w-full my-1 c">
          Emergency Information{" "}
        </span>
        <TempTypeInput
          setState={setemergencyContactNameR}
          label={"Emergency Contact Name"}
          value={chauffeur.emergencyContactName}
          required={false}
          type={"text"}
        />
        <TempSelectInput
          setState={setemergencyContactRelationR}
          label={"Relation"}
          value={chauffeur.emergencyContactRelation}
          required={false}
          options={
            !other2
              ? ["Father", "Mother", "Brother", "Other"]
              : [
                  "Father",
                  "Mother",
                  "Brother",
                  chauffeur.emergencyContactRelation,
                  "Other",
                ]
          }
        />
        <TempTypeInput
          setState={setemergencyContactPhoneR}
          label={"Emergency Phone"}
          value={chauffeur.emergencyContactPhone}
          required={false}
          type={"number"}
        />
      </div>
    </div>
  );
}







