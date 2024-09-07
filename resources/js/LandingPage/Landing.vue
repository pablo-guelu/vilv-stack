<template>
    <v-app>
  
      <v-main>
        <LandingSection />
  
        <WhatWeDoSection />
  
        <DiscoverHelp />
  
        <CustomizeSection />

        <AmazingFeaturesSection />
  
        <PricingSection />
  
        <FAQSection />
  
        <ContactUsSection />
      </v-main>
  
      <AppFooter />
    </v-app>
  </template>
  
  <script setup>
import AmazingFeaturesSection from './components/AmazingFeaturesSection.vue';
import AppFooter from './components/app/AppFooter.vue';
import ContactUsSection from './components/ContactUsSection.vue';
import CustomizeSection from './components/CustomizeSection.vue';
import DiscoverHelp from './components/DiscoverHelp.vue';
import FAQSection from './components/FAQSection.vue';
import LandingSection from './components/LandingSection.vue';
import PricingSection from './components/PricingSection.vue';
import WhatWeDoSection from './components/WhatWeDoSection.vue';

    //
  </script>