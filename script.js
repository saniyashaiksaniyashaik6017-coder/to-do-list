const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Math Error" || display.value === "Invalid input") {
        display.value = "";
    }
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const expression = display.value;
    if (!expression) return;

    // Permit only calculator characters before evaluating the expression.
    if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
        display.value = "Invalid input";
        return;
    }

    try {
        const result = Function('"use strict"; return (' + expression + ')')();
        if (typeof result !== "number" || !Number.isFinite(result)) {
            display.value = "Math Error";
            return;
        }
        display.value = Number(result.toPrecision(12)).toString();
    } catch {
        display.value = "Math Error";
    }
}
