export default function dateFormat(value) {
    const date = new Date(value * 1000);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}