class MidpointOverflow {
    public static void main(String[] args) {
        int low = 1_500_000_000;
        int high = 2_000_000_000;

        // Java int overflow wraps according to 32-bit two's-complement arithmetic.
        int unsafeMid = (low + high) / 2;
        int safeMid = low + (high - low) / 2;

        System.out.println("unsafe mid: " + unsafeMid); // -397483648
        System.out.println("safe mid:   " + safeMid);   // 1750000000
    }
}
