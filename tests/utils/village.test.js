import {expect, test} from "vitest";
import { Villages } from "src/utils/village"

let v1 = [
    {x: 1, y: 1, v:5},
    {x: 1, y: 1, v:1},
    {x: 1, y: 2, v:1},
]
let v2 = [
    {x: 1, y: 2, v: 2},
    {x: 2, y: 2, v: 2},
]

test('can unique', ()=>{
    let v = v1.concat(v2);
    expect(Villages.unique(v)).toStrictEqual([
        {x: 1, y: 1, v: 1},
        {x: 1, y: 2, v: 2},
        {x: 2, y: 2, v: 2},
    ])
})
