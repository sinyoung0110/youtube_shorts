#include <stdio.h>

int binary_search(const int A[], int n, int key, int upper_mid) {
    int left = 0;
    int right = n - 1;

    while (left <= right) {
        int span = right - left;
        int mid = left + (span + (upper_mid ? 1 : 0)) / 2;

        if (A[mid] == key) return mid;
        if (key < A[mid]) right = mid - 1;
        else left = mid + 1;
    }
    return -1;
}

int main(void) {
    const int A[] = {1, 3, 5, 12, 19, 20, 22, 25, 29, 31};
    int n = sizeof(A) / sizeof(A[0]);
    printf("lower mid: %d\n", binary_search(A, n, 12, 0));
    printf("upper mid: %d\n", binary_search(A, n, 12, 1));
    return 0;
}
