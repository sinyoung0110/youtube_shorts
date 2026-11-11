#include <stdio.h>

int count = 0;
int A[] = {1, 3, 5, 8, 12, 15, 20, 24, 30, 44, 52, 61, 64, 70, 81, 90};

int bin(int low, int high, int key) {
    int mid;
    count++;
    if (low > high) return 0;
    else {
        mid = (low + high) / 2;
        if (key == A[mid]) return 1;
        else if (key < A[mid]) return bin(low, mid - 1, key);
        else return bin(mid + 1, high, key);
    }
}

int main(void) {
    bin(0, 15, 22);
    printf("count: %d, ", count);
    bin(0, 15, 52);
    printf("count: %d\n", count);
    return 0;
}
