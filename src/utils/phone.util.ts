export const phoneFormat = (phone: string): string => {
  const region: string = phone.substring(0, 3);
  const _phone: string = phone.split(region)[1];
  let country = "";
  switch (region) {
    case "886":
      country = "台灣";
      break;
    case "852":
      country = "香港";
      break;
    case "853":
      country = "澳門";
      break;
  }
  return `+${region} - ${_phone} (${country})`;
};
