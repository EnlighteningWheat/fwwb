// 饼状图数据
var pieData1 = {
    series: [
        { name: '第一季度', value: 25 },
        { name: '第二季度', value: 25 },
        { name: '第三季度', value: 25 },
        { name: '第四季度', value: 25 }
    ]
};

// 柱状图数据
var barData1 = {
    categories: ['类别1', '类别2', '类别3'],
    series: [
        { name: '系列1', data: [85, 90, 88] },
        { name: '系列2', data: [78, 82, 80] },
        { name: '系列3', data: [92, 85, 89] }
    ]
};

// 初始化饼状图1
var pieChart1 = echarts.init(document.getElementById('pieChart1'));
var pieOption1 = {
    title: { text: '推荐准确率' },
    series: [{
        type: 'pie',
        data: pieData1.series,
        label: {
            show: false
        }
    }],
    legend: {
        bottom: 0,
        data: pieData1.series.map(function (item) {
            return item.name;
        }),
        orient: 'horizontal',
        textStyle: {
            fontSize: 10 // 控制标注字体大小
        },
        itemWidth: 10 // 控制标注色块大小
    }

};
pieChart1.setOption(pieOption1);


// 初始化饼状图2
var pieChart2 = echarts.init(document.getElementById('pieChart2'));
var pieOption2 = {
    title: { text: '问答准确率' },
    series: [{
        type: 'pie',
        data: pieData1.series,
        label: {
            show: false
        }
    }],
    legend: {
        bottom: 0,
        data: pieData1.series.map(function (item) {
            return item.name;
        }),
        orient: 'horizontal',
        textStyle: {
            fontSize: 10 // 控制标注字体大小
        },
        itemWidth: 10 // 控制标注色块大小
    }
};
pieChart2.setOption(pieOption2);

// 初始化饼状图3
var pieChart3 = echarts.init(document.getElementById('pieChart3'));
var pieOption3 = {
    title: { text: '知识图谱准确率' },
    series: [{
        type: 'pie',
        data: pieData1.series,
        label: {
            show: false
        }
    }],
    legend: {
        bottom: 0,
        data: pieData1.series.map(function (item) {
            return item.name;
        }),
        orient: 'horizontal',
        textStyle: {
            fontSize: 10 // 控制标注字体大小
        },
        itemWidth: 10 // 控制标注色块大小
    }
};
pieChart3.setOption(pieOption3);

// 初始化柱状图1
var barChart1 = echarts.init(document.getElementById('barChart1'));
var barOption1 = {
    title: { text: '推荐准确率' },
    xAxis: {
        data: barData1.categories
    },
    yAxis: {},
    series: barData1.series.map(function (item) {
        return {
            type: 'bar',
            name: item.name,
            data: item.data
        };
    }),
    legend: {
        bottom: 0,
        data: barData1.series.map(function (item) {
            return item.name;
        }),
        orient: 'horizontal'
    }
};
barChart1.setOption(barOption1);

// 初始化柱状图2
var barChart2 = echarts.init(document.getElementById('barChart2'));
var barOption2 = {
    title: { text: '问答准确率' },
    xAxis: {
        data: barData1.categories
    },
    yAxis: {},
    series: barData1.series.map(function (item) {
        return {
            type: 'bar',
            name: item.name,
            data: item.data
        };
    }),
    legend: {
        bottom: 0,
        data: barData1.series.map(function (item) {
            return item.name;
        }),
        orient: 'horizontal'
    }
};
barChart2.setOption(barOption2);

// 初始化柱状图3
var barChart3 = echarts.init(document.getElementById('barChart3'));
var barOption3 = {
    title: { text: '知识图谱准确率' },
    xAxis: {
        data: barData1.categories
    },
    yAxis: {},
    series: barData1.series.map(function (item) {
        return {
            type: 'bar',
            name: item.name,
            data: item.data
        };
    }),
    legend: {
        bottom: 0,
        data: barData1.series.map(function (item) {
            return item.name;
        }),
        orient: 'horizontal'
    }
};
barChart3.setOption(barOption3);