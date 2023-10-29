export default {
  setup() {},
  template: `
    <header class="header bg-toggle d-flex justify-content-between align-items-center mb-2 p-2 rounded-1">
            <div class="header-left flex-grow-1">
                21120461
            </div>
            <div class="header-center flex-grow-3 text-center">
                <h1>Movies Info</h1>
            </div>
            <div class="header-right flex-grow-1 text-end">
                <p>API461</p>
                <!-- Default switch -->
                <div class="form-check form-switch float-end">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Dark mode</label>
                </div>
            </div>
        </header>
  `,
};
