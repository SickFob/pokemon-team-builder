class StringUtils {
  static initCap(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }


}

export default StringUtils;