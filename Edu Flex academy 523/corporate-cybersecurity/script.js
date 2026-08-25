/* =====================================================
   CORPORATE SECURITY PACKAGE CALCULATOR
   This script only works with elements having cs-page IDs/classes.
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const packageSelect = document.getElementById("package");
    const employeesInput = document.getElementById("employees");
    const addons = document.querySelectorAll(".cs-addon");
    const calculateBtn = document.getElementById("calculateBtn");

    const selectedPackage = document.getElementById("selectedPackage");
    const totalPrice = document.getElementById("totalPrice");
    const employeeResult = document.getElementById("employeeResult");
    const basePrice = document.getElementById("basePrice");
    const addonPrice = document.getElementById("addonPrice");


    function calculatePackage() {

        const packagePrice = Number(packageSelect.value);

        let employees = Number(employeesInput.value);

        if (employees < 1 || isNaN(employees)) {
            employees = 1;
            employeesInput.value = 1;
        }

        if (employees > 1000) {
            employees = 1000;
            employeesInput.value = 1000;
        }


        let addonsTotal = 0;

        addons.forEach(function (addon) {

            if (addon.checked) {
                addonsTotal += Number(addon.value);
            }

        });


        /*
            Every additional employee after the first 10
            adds $20 to the estimated package.
        */

        let employeeCost = 0;

        if (employees > 10) {
            employeeCost = (employees - 10) * 20;
        }


        const total = packagePrice + addonsTotal + employeeCost;


        const packageName =
            packageSelect.options[
                packageSelect.selectedIndex
            ].text.split("—")[0].trim();


        selectedPackage.textContent =
            packageName + " Package";

        totalPrice.textContent =
            total.toLocaleString();

        employeeResult.textContent =
            employees;

        basePrice.textContent =
            packagePrice.toLocaleString();

        addonPrice.textContent =
            (addonsTotal + employeeCost).toLocaleString();

    }


    calculateBtn.addEventListener(
        "click",
        calculatePackage
    );


    packageSelect.addEventListener(
        "change",
        calculatePackage
    );


    employeesInput.addEventListener(
        "input",
        calculatePackage
    );


    addons.forEach(function (addon) {

        addon.addEventListener(
            "change",
            calculatePackage
        );

    });


    // Initial calculation
    calculatePackage();

});