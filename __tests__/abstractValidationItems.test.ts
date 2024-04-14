import { AbstractValidationItems, DataSourceItem } from "../src";
import {v4 as uuidv4} from "uuid";

interface TestInvalidDataType {
    readonly a: string;
    readonly b: number;
    readonly c: boolean;
}

interface TestValidData extends TestInvalidDataType, DataSourceItem {}

function GET_TEST_DATA_STATIC(): TestInvalidDataType[] {
    return [
        {//0
            a: 'Lorem ipsum dolor sit amet, te eum aeque quaestio pertinacia',
            b: 1,
            c: false
        },
        {//1
            a: 'Vel volumus singulis adipiscing et. Ne pri quis volutpat pertinacia, his percipit comprehensam ne',
            b: 1,
            c: false
        },
        {//2
            a: 'Ius nostrum urbanitas eu, eu nulla impetus quaeque vel, vix ut debitis fierent molestiae. Ne his vitae corrumpit intellegat. Qui id consul disputationi, sit in paulo viris evertitur.',
            b: 2,
            c: true
        },
        {//3
            a: 'Lorem ipsum dolor sit amet, te eum aeque quaestio pertinacia',
            b: 2,
            c: true
        },
        {//4
            a: 'Lorem ipsum dolor sit amet, Ei sed fugit accumsan temporibus, qui libris qualisque no. Ius in inimicus indoctum, no pri mazim latine.',
            b: 3,
            c: false
        },
        {//5
            a: 'Ea consul doming cetero est, ubique elaboraret no eam. Mei stet incorrupte cu, qui ei homero deterruisset',
            b: 3,
            c: false
        },
        {//6
            a: 'Nec sumo alienum facilisis te, an quo etiam vivendo quaerendum, mea liber salutatus no',
            b: 4,
            c: true
        },
        {//7
            a: 'Purto exerci id est. Cum cu deleniti ocurreret, graeci philosophia has ne.',
            b: 4,
            c: true
        },
        {//8
            a: 'Augue verterem splendide pri et, sea altera scaevola ex, pri at ridens erroribus. Vis aeque vitae id, pri soluta iuvaret civibus et, ea erat porro assueverit usu',
            b: 5,
            c: false
        },
        {//9
            a: 'Lorem ipsum dolor sit amet, Per at meliore sadipscing omittantur, modus semper meliore sed ea. His inani choro nemore ut, id quod voluptua mei',
            b: 5,
            c: false
        }
    ];
}

class Validation extends AbstractValidationItems<Partial<TestInvalidDataType>, TestValidData> {
    public validationItem(item: Partial<TestInvalidDataType> | null | undefined, existingUuid?: string | undefined): TestValidData | undefined {
        if(!item) {
            return undefined;
        }

        return {
            uuid: existingUuid ? existingUuid : uuidv4(),
            a: typeof item.a === 'string' ? item.a : '',
            b: typeof item.b === 'number' ? item.b : -1,
            c: !!item.c
        }
    }
}

test('Validation items list', () => {
    const validation: Validation = new Validation();
    const testData: Partial<TestInvalidDataType>[] = GET_TEST_DATA_STATIC();
    const validItems: TestValidData[] = validation.validationItemsList(testData);

    const result: Omit<TestValidData, 'uuid'>[] = validItems.map(i => ({
        a: i.a,
        b: i.b,
        c: i.c
    }));

    expect(result).toStrictEqual(GET_TEST_DATA_STATIC());
});

test('Validation items list', () => {
    const validation: Validation = new Validation();
    const testData: Partial<TestInvalidDataType>[] = GET_TEST_DATA_STATIC();
    //@ts-ignore
    testData.push(undefined);

    const validItems: TestValidData[] = validation.validationItemsList(testData);

    const result: Omit<TestValidData, 'uuid'>[] = validItems.map(i => ({
        a: i.a,
        b: i.b,
        c: i.c
    }));

    expect(result).toStrictEqual(GET_TEST_DATA_STATIC());
});


test('Empty array', () => {
    const validation: Validation = new Validation();
    const result: TestValidData[] = validation.validationItemsList([]);
    expect(result).toStrictEqual([]);
});

test('undefined', () => {
    const validation: Validation = new Validation();
    const result: TestValidData[] = validation.validationItemsList(undefined);
    expect(result).toStrictEqual([]);
});

test('null', () => {
    const validation: Validation = new Validation();
    const result: TestValidData[] = validation.validationItemsList(null);
    expect(result).toStrictEqual([]);
});

test('invalid type string', () => {
    const validation: Validation = new Validation();
    //@ts-ignore
    const result: TestValidData[] = validation.validationItemsList('test');
    expect(result).toStrictEqual([]);
});

test('invalid type number', () => {
    const validation: Validation = new Validation();
    //@ts-ignore
    const result: TestValidData[] = validation.validationItemsList(5);
    expect(result).toStrictEqual([]);
});

test('invalid type object', () => {
    const validation: Validation = new Validation();
    //@ts-ignore
    const result: TestValidData[] = validation.validationItemsList({a: 1, b: 2});
    expect(result).toStrictEqual([]);
});