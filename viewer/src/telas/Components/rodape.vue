    <template>
  <div class="Rodape">
    <div v-for="item in Falhas" :key="item">{{ item }}</div>
  </div>
</template>

    <script>
export default {};
</script>

    <style scoped>
.Rodape {
  height: auto;
  background-color: var(--surface-a);
  padding: 10px;
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 9%;
}
</style>
