export class Villages {
    static unique = (arr) => [...new Map(arr.map(item => [`${item.x},${item.y}`, item])).values()];
}