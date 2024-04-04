export const summer = (num) => {

    const strOfnums = num.toString().split('');

    const summmary = strOfnums.reduce((sum, num) => sum += parseInt(num), 0);

    return summmary;
}