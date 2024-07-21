export const fetchPartData = async (id, partName) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/improved-users/${id}/${partName}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const processTimeStr = (timeStr, type) => {
  if (type === "month") {
    try { if (timeStr.length < 4) { return timeStr } else { return `${timeStr.slice(0, 4)}-${timeStr.slice(4)}` } } catch (error) { return ""; }
  }
  else if (type === "year") { try { return `${timeStr.slice(0, 4)}-${timeStr.slice(4, 2)}-${timeStr.slice(6)}`; } catch (error) { return ""; } }
}

export const extractDateRange = (dateString) => {
  try {
    const [start, end] = dateString.split('-');
    return [processTimeStr(start, "month"), processTimeStr(end, "month")];
  } catch (error) {
    return ["", ""];
  }
}

