function getShoppingCartItem(listBarCode) {
    var cartGoods = [];
    var goods = loadAllItems();
    goods.forEach(function(item) { //取得商品的数量以及有多少个免费的商品
        if (listBarCode[item.barcode]) {
            item.count = listBarCode[item.barcode];
            item.free = Math.floor(item.count / 3);
            cartGoods.push(item);
        }
    });
    return cartGoods;
}

/*所有商品信息 */
function loadAllItems() {
    return [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}


/* loadPromotions()打折促销函数*/
function loadPromotions() {
    return [{
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
            'ITEM000000',
            'ITEM000001',
            'ITEM000005'
        ]
    }];
}

/*用于获取购物车中商品的数量和商品的barcode */
function getListBarCode(inputs) {

    inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
    ];

    var barcodes = {};
    inputs.forEach(function(inputBarCode) {
        if (barcodes[inputBarCode] || inputBarCode.indexOf('-') != -1) { //判断输入的编码是否存在
            barcodes[inputBarCode]++;
            let goodNum = inputBarCode.substring(inputBarCode.indexOf('-') + 1, inputBarCode.length);
            barcodes[inputBarCode.substring(0, inputBarCode.indexOf('-'))] = goodNum;
        } else {
            barcodes[inputBarCode] = 1;
        }
    });
    return barcodes; //返回对象：barcode,以及相应的数量
}


//计算购物清单
function getShoppingLists(shoppingCart) {
    let str1 = '----------------------';
    var listForFree = str1 + '\n' + '挥泪赠送商品：';
    let str2 = '**********************';
    var cartItemInfo = '***<没钱赚商店>购物清单***';
    var summary = 0;
    var save = 0;

    shoppingCart.forEach(function(lists) {
        var subtotal = (lists.count - lists.free) * lists.price;
        let str3 = '名称：' + lists.name + ',数量：' + lists.count +
            lists.unit + ',单价：' + lists.price.toFixed(2) + '(元),小计：' +
            subtotal.toFixed(2) + '(元)';
        cartItemInfo = cartItemInfo + '\n' + str3;
        summary += subtotal;

        if (lists.free > 0) {
            let str4 = '名称：' + lists.name + ',数量：' + lists.free + lists.unit;
            listForFree = listForFree + '\n' + str4;
            save += lists.free * lists.price;
        }
    });

    // 总计以及节省
    let summaryAndSave = '总计：' + summary.toFixed(2) + '(元)' + '\n' + '节省：' + save.toFixed(2) + '(元)';
    cartItemInfo = cartItemInfo + '\n' + listForFree + '\n' + str1 + '\n' + summaryAndSave + '\n' + str2;
    return cartItemInfo;
}
module.exports = function printInventory(inputs) {
    var listBarCode = getListBarCode(inputs);
    var shoppingCart = getShoppingCartItem(listBarCode);
    var listForPrint = getShoppingLists(shoppingCart);
    console.log(listForPrint);
};