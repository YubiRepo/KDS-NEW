<template>
  <section>
    <div class="container-fluid vh-100">
      <div class="row h-50">
        <!-- Left side with image -->
        <div
          class="col-sm-6 px-0 d-none d-sm-block bg-primary vh-100 bg-secondary">
          <img
            src="https://s3-alpha-sig.figma.com/img/f1a1/6d1a/2984c5830493e8e4cdd410f23ed473ac?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ccAjYXbHZJ4DTReFsmYECmpFgyLyOKwew9EBfnPOiiOkVW-XQBwLGyw~5rWZME8r338hsH28W3b9dY1QpdrHStzgojycpv~GXnS6yc~b2xHITf2o8plX~z7zXdPw4Lrp6Zn~JQPjkVavutIOTlif1JMZ3LpSMuzJJ14haM9K51iwGOU9PtOb3IE21s3Z0owzWdpyhGBPMBvYpJp3htu7~8mAl3uXVGdjvBH0m3g7Hy~i0TMyKALflsUQs5C9rWSfZQhkgmWaxS~Sl4ovLXaq1fGpsoNZYf5mZ4EF4EJ7dlgHVJtyYr-aEqRLzQOf5bFrYAR9PfFlCr1olGw-Q0AT-A__"
            class="img-fluid h-100"
            alt="Nature"
            style="object-fit: cover" />
        </div>
        <div class="col-sm-6 d-flex justify-content-center align-items-center">
          <div class="container px-5 py-5">
            <!-- form email and username -->
            <div class="row">
              <div class="col-12">
                <h2 class="">Welcome Back</h2>
                <p class="text-primary">Login to your account to continue</p>
                <v-sheet class="" rounded>
                  <v-card class="mx-auto px-6 py-8">
                    <v-form v-model="form" @submit.prevent="onSubmit">
                      <v-text-field
                        v-model="email"
                        :readonly="loading"
                        :rules="[required]"
                        class=""
                        label="Email"
                        variant="outlined"
                        placeholder="Enter your email"
                        clearable></v-text-field>

                      <v-text-field
                        v-model="password"
                        :readonly="loading"
                        :rules="[required]"
                        variant="outlined"
                        label="Password"
                        :type="showPassword ? 'text' : 'password'"
                        append-inner-icon="mdi-eye"
                        placeholder="Enter your password"
                              @click:append-inner="showPassword = !showPassword"
                        clearable></v-text-field>
                      <br />
                      <v-btn
                        :disabled="!form"
                        :loading="loading"
                        color="success"
                        size="large"
                        type="submit"
                        variant="elevated"
                        block>
                        Sign In
                      </v-btn>
                    </v-form>
                  </v-card>
                </v-sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
      showPassword: false,
    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
        localStorage.setItem('user', JSON.stringify({ email: this.email }))
        this.$router.push({ name: 'Dashboard' })
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
</script>