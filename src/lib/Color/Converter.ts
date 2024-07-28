// https://css-tricks.com/converting-color-spaces-in-javascript/
// https://web-toolbox.dev/en/tools/color-converter

import { log } from "console";

interface ColorsValues {
	hsla: string,
	rgba: string,
	hexa: string
}

export function getColorValues(colorString: string): ColorsValues {

	let colorStr = colorString.split(" ")

	let values:ColorsValues = {
		hsla: "",
		rgba: "",
		hexa: "",
	}

	if (colorStr[0].includes("hsla")) {
		let type = colorStr[0].split("(")[0]
		let h = colorStr[0].split("(")[1].replace(",", "")
		let s = colorStr[1].replace(",", "")
		let l = colorStr[2].replace(",", "")
		let alpha = colorStr[3].replace(")", "")

		const newAlpha = parseFloat(alpha) / 100;

		values.hsla = `${type}(${h}, ${s}, ${l}, ${newAlpha})`
		values.rgba = HSLAToRGBA(values.hsla, false)
		values.hexa = RGBAToHexA(values.rgba)
	}

	if (colorStr[0].includes("rgba")) {

		let type = colorStr[0].split("(")[0]
		let h = colorStr[0].split("(")[1].replace(",", "")
		let s = colorStr[1].replace(",", "")
		let l = colorStr[2].replace(",", "")
		let alpha = colorStr[3].replace(")", "")

		values.rgba = `${type}(${h}, ${s}, ${l}, ${alpha})`
		values.hsla = RGBAToHSLA(values.rgba)
		values.hexa = RGBAToHexA(values.rgba)
	}

	if (!(colorStr[0].includes("hsla") || colorStr[0].includes("rgba"))) {
		throw new Error('Invalid HSLA string format');
	}

	return values

}

export function RGBAToHexA(rgba: string): string {
    const ex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
    if (ex.test(rgba)) {
        let sep = rgba.indexOf(",") > -1 ? "," : " ";
        const rgbaValues = rgba.substr(5).split(")")[0].split(sep);

        // Strip the slash if using space-separated syntax
        if (rgbaValues.indexOf("/") > -1) {
            rgbaValues.splice(3, 1);
        }

        for (let i = 0; i < rgbaValues.length; i++) {
            const r = rgbaValues[i];
            if (r.indexOf("%") > -1) {
                const p = parseFloat(r.substr(0, r.length - 1)) / 100;

                if (i < 3) {
                    rgbaValues[i] = Math.round(p * 255).toString();
                } else {
                    rgbaValues[i] = p.toString();
                }
            }
        }

        const r = (+rgbaValues[0]).toString(16).padStart(2, '0');
        const g = (+rgbaValues[1]).toString(16).padStart(2, '0');
        const b = (+rgbaValues[2]).toString(16).padStart(2, '0');
        const a = Math.round(+rgbaValues[3] * 255).toString(16).padStart(2, '0');

        return `#${r}${g}${b}${a}`;
    } else {
        return "Invalid input color";
    }
}

export function hexToRGB(h: string, isPct?: boolean): string {
    // Regular expression to validate hex color code
    const ex = /^#([\da-f]{3}){1,2}$/i;
    
    if (ex.test(h)) {
        let r = 0, g = 0, b = 0;
        isPct = isPct === true;

        // 3 digits hex color code
        if (h.length === 4) {
            r = parseInt(h[1] + h[1], 16);
            g = parseInt(h[2] + h[2], 16);
            b = parseInt(h[3] + h[3], 16);

        // 6 digits hex color code
        } else if (h.length === 7) {
            r = parseInt(h[1] + h[2], 16);
            g = parseInt(h[3] + h[4], 16);
            b = parseInt(h[5] + h[6], 16);
        }

        if (isPct) {
            r = +(r / 255 * 100).toFixed(1);
            g = +(g / 255 * 100).toFixed(1);
            b = +(b / 255 * 100).toFixed(1);
        }

        return `rgb(${isPct ? `${r}%,${g}%,${b}%` : `${r},${g},${b}`})`;
    } else {
        return "Invalid input color";
    }
}

export function hexAToRGBA(h: string, isPct: boolean = false): string {
	const ex = /^#([\da-f]{4}){1,2}$/i;
	if (ex.test(h)) {
	  let r = 0, g = 0, b = 0, a = 1;
  
	  if (h.length === 5) {
		r = parseInt("0x" + h[1] + h[1], 16);
		g = parseInt("0x" + h[2] + h[2], 16);
		b = parseInt("0x" + h[3] + h[3], 16);
		a = parseInt("0x" + h[4] + h[4], 16);
	  } else if (h.length === 9) {
		r = parseInt("0x" + h[1] + h[2], 16);
		g = parseInt("0x" + h[3] + h[4], 16);
		b = parseInt("0x" + h[5] + h[6], 16);
		a = parseInt("0x" + h[7] + h[8], 16);
	  }
  
	  a = parseFloat((a / 255).toFixed(3));
	  if (isPct) {
		r = parseFloat((r / 255 * 100).toFixed(1));
		g = parseFloat((g / 255 * 100).toFixed(1));
		b = parseFloat((b / 255 * 100).toFixed(1));
		a = parseFloat((a * 100).toFixed(1));
	  }
  
	  return "rgba(" + (isPct ? r + "%," + g + "%," + b + "%," + a : r + "," + g + "," + b + "," + a) + ")";
	} else {
	  return "Invalid input color";
	}
}

export function RGBToHSL(rgb: string): string {
    const ex: RegExp = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
    
    if (ex.test(rgb)) {
        let sep: string = rgb.indexOf(",") > -1 ? "," : " ";
        let rgbArray: string[] = rgb.substr(4).split(")")[0].split(sep);
        
        // Convert %s to 0–255
        for (let i: number = 0; i < rgbArray.length; i++) {
            let r: string = rgbArray[i];
            if (r.indexOf("%") > -1) {
                rgbArray[i] = Math.round(parseFloat(r.substr(0, r.length - 1)) / 100 * 255).toString();
            }
        }

        // Make r, g, and b fractions of 1
        let r: number = parseInt(rgbArray[0]) / 255;
        let g: number = parseInt(rgbArray[1]) / 255;
        let b: number = parseInt(rgbArray[2]) / 255;

        // Find greatest and smallest channel values
        let cmin: number = Math.min(r, g, b);
        let cmax: number = Math.max(r, g, b);
        let delta: number = cmax - cmin;
        let h: number = 0;
        let s: number = 0;
        let l: number = 0;

        // Calculate hue
        if (delta === 0) {
            h = 0;
        } else if (cmax === r) {
            // Red is max
            h = ((g - b) / delta) % 6;
        } else if (cmax === g) {
            // Green is max
            h = (b - r) / delta + 2;
        } else {
            // Blue is max
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) {
            h += 360;
        }

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        
        return `hsl(${h},${s}%,${l}%)`;
    } else {
        return "Invalid input color";
    }
}

export function RGBAToHSLA(rgba: string): string {
    const ex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
    if (ex.test(rgba)) {
        let sep = rgba.indexOf(",") > -1 ? "," : " ";
        const rgbaValues = rgba.substr(5).split(")")[0].split(sep);

        // Strip the slash if using space-separated syntax
        if (rgbaValues.indexOf("/") > -1) {
            rgbaValues.splice(3, 1);
        }

        for (let i = 0; i < rgbaValues.length; i++) {
            const r = rgbaValues[i];
            if (r.indexOf("%") > -1) {
                const p = parseFloat(r.substr(0, r.length - 1)) / 100;
                if (i < 3) {
                    rgbaValues[i] = Math.round(p * 255).toString();
                }
            }
        }

        // Make r, g, and b fractions of 1
        const r = parseFloat(rgbaValues[0]) / 255;
        const g = parseFloat(rgbaValues[1]) / 255;
        const b = parseFloat(rgbaValues[2]) / 255;
        const a = parseFloat(rgbaValues[3]);

        // Find greatest and smallest channel values
        const cmin = Math.min(r, g, b);
        const cmax = Math.max(r, g, b);
        const delta = cmax - cmin;
        let h = 0;
        let s = 0;
        let l = 0;

        // Calculate hue
        if (delta === 0) {
            h = 0;
        } else if (cmax === r) {
            h = ((g - b) / delta) % 6;
        } else if (cmax === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) {
            h += 360;
        }

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    } else {
        return "Invalid input color";
    }
}

export function HSLAToRGBA(hsla,isPct) {
	let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
	if (ex.test(hsla)) {
		let sep = hsla.indexOf(",") > -1 ? "," : " ";
		hsla = hsla.substr(5).split(")")[0].split(sep);

		// strip the slash if using space-separated syntax
		if (hsla.indexOf("/") > -1)
			hsla.splice(3,1);

		isPct = isPct === true;

		// must be fractions of 1
		let h = hsla[0],
			s = hsla[1].substr(0,hsla[1].length-1) / 100,
			l = hsla[2].substr(0,hsla[2].length-1) / 100,
			a = hsla[3];
		
		// strip label and convert to degrees (if necessary)
		if (h.indexOf("deg") > -1)
			h = h.substr(0,h.length - 3);
		else if (h.indexOf("rad") > -1)
			h = Math.round(h.substr(0,h.length - 3) / (2 * Math.PI) * 360);
		else if (h.indexOf("turn") > -1)
			h = Math.round(h.substr(0,h.length - 4) * 360);
		if (h >= 360)
			h %= 360;

		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs((h / 60) % 2 - 1)),
			m = l - c/2,
			r = 0,
			g = 0,
			b = 0;
		
		if (0 <= h && h < 60) {
			r = c; g = x; b = 0;
		} else if (60 <= h && h < 120) {
			r = x; g = c; b = 0;
		} else if (120 <= h && h < 180) {
			r = 0; g = c; b = x;
		} else if (180 <= h && h < 240) {
			r = 0; g = x; b = c;
		} else if (240 <= h && h < 300) {
			r = x; g = 0; b = c;
		} else if (300 <= h && h < 360) {
			r = c; g = 0; b = x;
		}

		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);

		let pctFound = a.indexOf("%") > -1;

		if (isPct) {
			r = +(r / 255 * 100).toFixed(1);
			g = +(g / 255 * 100).toFixed(1);
			b = +(b / 255 * 100).toFixed(1);
			if (!pctFound) {
				a *= 100;
			} else {
				a = a.substr(0,a.length - 1);
			}

		} else if (pctFound) {
			a = a.substr(0,a.length - 1) / 100;
		}
		
		return "rgba("+ (isPct ? r + "%," + g + "%," + b + "%," + a + "%" : +r + ","+ +g + "," + +b + "," + +a) + ")";

	} else {
		return "Invalid input color";
	}
}