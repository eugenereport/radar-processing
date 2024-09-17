export class RadarConfig {

  constructor(formElement, callback) {

    this.formElement = formElement;
    this.callback = callback;

    this.measurementsInput = this.formElement.querySelector(
      "#measurementsPerRotation"
    );
    this.rotationSpeedInput = this.formElement.querySelector("#rotationSpeed");
    this.targetSpeedInput = this.formElement.querySelector("#targetSpeed");

    this.errorMeasurements =
      this.formElement.querySelector("#errorMeasurements");
    this.errorRotationSpeed = this.formElement.querySelector(
      "#errorRotationSpeed"
    );
    this.errorTargetSpeed = this.formElement.querySelector("#errorTargetSpeed");

    this.formElement.addEventListener("submit", this.handleSubmit.bind(this));

  }

  handleSubmit(event) {
    
    event.preventDefault();

    this.clearErrors();

    const measurementsPerRotation = this.measurementsInput.value.trim();
    const rotationSpeed = this.rotationSpeedInput.value.trim();
    const targetSpeed = this.targetSpeedInput.value.trim();

    let hasError = false;

    if (
      !measurementsPerRotation ||
      isNaN(measurementsPerRotation) ||
      Number(measurementsPerRotation) <= 0
    ) {
      this.errorMeasurements.innerText =
        "Будь ласка, введіть дійсне число більше 0";
      hasError = true;
    }

    if (!rotationSpeed || isNaN(rotationSpeed) || Number(rotationSpeed) <= 0) {
      this.errorRotationSpeed.innerText =
        "Будь ласка, введіть дійсне число більше 0";
      hasError = true;
    }

    if (!targetSpeed || isNaN(targetSpeed) || Number(targetSpeed) <= 0) {
      this.errorTargetSpeed.innerText =
        "Будь ласка, введіть дійсне число більше 0";
      hasError = true;
    }

    if (!hasError) {
      const formData = {
        measurementsPerRotation: measurementsPerRotation,
        rotationSpeed: rotationSpeed,
        targetSpeed: targetSpeed,
      };

      this.callback(formData);
    }
  }

  setConfig(config) {
    this.measurementsInput.value = config.measurementsPerRotation || "";
    this.rotationSpeedInput.value = config.rotationSpeed || "";
    this.targetSpeedInput.value = config.targetSpeed || "";
  }

  clearErrors() {
    this.errorMeasurements.innerText = "";
    this.errorRotationSpeed.innerText = "";
    this.errorTargetSpeed.innerText = "";
  }
}
