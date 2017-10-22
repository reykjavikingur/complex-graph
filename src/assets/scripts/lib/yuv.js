const WR = 0.299;
const WB = 0.114;
const WG = 1 - WR - WB;
const Umax = 0.436;
const Vmax = 0.615;

class YUV {

    static rgb(r, g, b) {
        var y = WR * r + WG * g + WB * b;
        var u = (b - y) / (1 - WB) * Umax;
        var v = (r - y) / (1 - WR) * Vmax;
        var instance = new YUV();
        instance.data = [y, u, v];
        return instance;
    }

    constructor(y, u, v) {
        this.data = [y, u, v];
    }

    rgb() {
        var y = this.data[0];
        var u = this.data[1];
        var v = this.data[2];

        var r = y + v * (1 - WR) / Vmax;
        var b = y + u * (1 - WB) / Umax;
        var g = y - u * WB * (1 - WB) / Umax / WG - v * WR * (1 - WR) / Vmax / WG;

        return [r, g, b];
    }
}

YUV.Umax = Umax;
YUV.Vmax = Vmax;

module.exports = YUV;
