<template>
  <footer class="bg-camlage-black border-t border-white/10 pt-16 pb-8 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
      <div class="col-span-2 md:col-span-1">
        <p class="font-display text-xl text-white mb-3">CAMLAGE<span class="text-[#c9a24b]">.</span></p>
        <p class="text-sm text-gray-500 leading-relaxed">Watches built and customized online, shipped to your door.</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-widest text-gray-400 mb-4">Shop</p>
        <ul class="space-y-2 text-sm text-gray-500">
          <li><router-link to="/products" class="hover:text-white">All watches</router-link></li>
          <li><router-link to="/products" class="hover:text-white">Dress</router-link></li>
          <li><router-link to="/products" class="hover:text-white">Sport</router-link></li>
          <li><router-link to="/gallery" class="hover:text-white">Gallery</router-link></li>
        </ul>
      </div>
      <div>
        <p class="text-xs uppercase tracking-widest text-gray-400 mb-4">Help</p>
        <ul class="space-y-2 text-sm text-gray-500">
          <li><a href="#" class="hover:text-white">Shipping</a></li>
          <li><a href="#" class="hover:text-white">Returns</a></li>
          <li><a href="#" class="hover:text-white">Warranty</a></li>
          <li><a href="#" class="hover:text-white">Contact us</a></li>
        </ul>
      </div>
      <div>
        <p class="text-xs uppercase tracking-widest text-gray-400 mb-4">Account</p>
        <ul class="space-y-2 text-sm text-gray-500">
          <li><router-link to="/login" class="hover:text-white">Sign in</router-link></li>
          <li><router-link to="/signup" class="hover:text-white">Create account</router-link></li>
          <li><router-link to="/cart" class="hover:text-white">Your cart</router-link></li>
        </ul>
      </div>
    </div>
    <div class="max-w-7xl mx-auto border-t border-white/10 pt-6 text-center text-[10px] text-gray-600 tracking-[0.2em] uppercase">
      &copy; 2026 Camlage Watches. All rights reserved.
    </div>
  </footer>
</template>
