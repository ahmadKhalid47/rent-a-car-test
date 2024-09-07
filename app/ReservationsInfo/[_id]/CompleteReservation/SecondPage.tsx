"use client";
import upload from "@/public/Paper Upload.svg";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSidebarShowR } from "@/app/store/Global";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { formatId } from "@/app/Components/functions/formats";
import { SmallLoader } from "@/app/Components/Loader";
import { useFileDrop } from "@/app/Components/functions/onDragFromDrag";
import { useDropzone } from "react-dropzone";
import { Thumbs } from "@/app/Components/functions/thumbsFromDrag";
import { TempTypeInput } from "@/app/Components/InputComponents/TypeInput";
import {
  setAllValues,
  setfuelCompletion,
  setfuelImagesCompletion,
  setodometerCompletion,
  setodometerImagesCompletion,
} from "@/app/store/reservations";

export default function SecondPage() {
  let reservation = useSelector((state: RootState) => state.reservation);
  let dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarShowR(false));
    } else {
      dispatch(setSidebarShowR(true));
    }
  }, [isMobile]);
  const [fuelFiles, setfuelFiles] = useState<any>(
    reservation?.fuelImagesCompletion
  );
  const [odometerFiles, setodometerFiles] = useState<any>(
    reservation?.odometerImagesCompletion
  );
  useEffect(() => {
    setfuelFiles(reservation?.fuelImagesCompletion);
  }, [reservation?.fuelImagesCompletion]);
  useEffect(() => {
    setodometerFiles(reservation?.odometerImagesCompletion);
  }, [reservation?.odometerImagesCompletion]);

  const onDropFuel = useFileDrop(
    (files: any[]) => setfuelFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );
  const onDropodometer = useFileDrop(
    (files: any[]) =>
      setodometerFiles((prevFiles: any) => [...prevFiles, ...files]) // Callback to handle filtered files
  );

  const { getRootProps: getRootPropsFuel, getInputProps: getInputPropsFuel } =
    useDropzone({
      onDrop: onDropFuel,
    });
  const {
    getRootProps: getRootPropsodometer,
    getInputProps: getInputPropsodometer,
  } = useDropzone({
    onDrop: onDropodometer,
  });

  useEffect(() => {
    dispatch(setfuelImagesCompletion(fuelFiles));
  }, [fuelFiles]);
  useEffect(() => {
    dispatch(setodometerImagesCompletion(odometerFiles));
  }, [odometerFiles]);

  console.log(reservation);

  return (
    <>
   second 
    </>
  );
}
