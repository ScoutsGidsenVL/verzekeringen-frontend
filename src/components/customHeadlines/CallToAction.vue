<template>
  <div id="block-scouts-footer-contact-cta-block" class="block">
    <div class="footer-contact-cta angled-section-wrapper call-to-action">
      <div class="angled-section angled-section--texture angled-section--bottom-right">
        <div class="angled-section__bg-image">
          <img src="/bg-texture.jpg" class="img-fluid img-fit-cover" alt="Contacteer Scouts en Gidsen Vlaanderen" loading="lazy" />
        </div>
        <div class="container angled-section__content pt-5 pb-6 pb-md-8 pt-lg-6 pb-lg-10 pt-xxl-8 pb-xxl-10 pb-xxxl-12">
          <div class="call-to-action__content">
            <div class="row justify-content-lg-center">
              <div class="col-12 col-lg-10">
                <div class="row">
                  <div class="col-12 col-md-7 col-lg-8 offset-md-3 offset-lg-4">
                    <router-link :to="link" class="btn btn-blob mt-0">
                      {{ text
                      }}<span class="btn-blob__inner">
                        <span class="btn-blob__blobs">
                          <span class="btn-blob__blob"></span> <span class="btn-blob__blob"></span> <span class="btn-blob__blob"></span> <span class="btn-blob__blob"></span>
                        </span>
                      </span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CallToAction',
  props: {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
})
</script>

<style></style>
