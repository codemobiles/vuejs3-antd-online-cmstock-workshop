import { imageUrl } from "@/services/constants";
import dayjs from "dayjs";

export default {
  currency(value: any) {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(value);
  },
  thousand(value: any) {
    return new Intl.NumberFormat("en-IN").format(value);
  },
  formatTime(dateString: string) {
    const date = dayjs(dateString);
    return date.format("DD/MM/YY • hh:mm");
  },
  formatDate(dateString: string) {
    const date = dayjs(dateString);
    return date.format("dddd MMMM D, YYYY hh:mm");
  },
  fullImageUrl(image: any) {
    return `${imageUrl}/${image}?timestamp=${Date.now()}`;
  },
};
