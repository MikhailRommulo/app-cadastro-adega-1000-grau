import { 
    parseISO, 
    format
} from 'date-fns';

export default function formatDateBrazil (dateOrder: Date) {
    const isoDate = parseISO(dateOrder.toLocaleString());

    const formatteDate = format(isoDate, "dd '/' MM '/' yyyy ' - ' HH:mm");

    return formatteDate;
}
