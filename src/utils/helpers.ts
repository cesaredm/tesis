export function formatDecimal(num: number){
    return new Intl.NumberFormat('en-ni', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
}